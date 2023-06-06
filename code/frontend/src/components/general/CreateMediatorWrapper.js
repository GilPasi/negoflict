import AddMediatorPage from "../../pages/AddMediatorPage"
import AddUserPage from "../../pages/AddUserPage"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUpdateMediatorResidentMutation,useAddMediatorMutation, useGetAddressesQuery, useLazyIsUsernameExistQuery, useRegisterOneUserMutation, useDeleteMediatorMutation, useDeleteAgoraUserMutation, useDeleteUserIfErrorMutation } from "../../store"
import { useSelector } from "react-redux"
import useAlert from '../../hooks/useAlert'

const baseData = {
    relevant_experience:'f',
    mediation_areas:'d',
    education:'s',
}
const CreateMediatorWrapper = ()=>{
    //hooks==========
    const {access} = useSelector(state=>state.user)
    const rediract = useNavigate()
    const {data:addressData, error:addressError} = useGetAddressesQuery({access:access})
    const {trigerNotification} = useAlert()

    //api's========================
    const [addMediator,{data:mediatorData, error:mediatorError}] = useAddMediatorMutation()
    const [registerUser, {error:registerUserError}] = useRegisterOneUserMutation()
    const [isUsernameExist,{data:isUserName}] = useLazyIsUsernameExistQuery()
    const [updateMediatorAddress,{data:updateAddressData,error:updateAddressError}] = useUpdateMediatorResidentMutation()
    const [deleteMediator] = useDeleteMediatorMutation()
    const [deleteAgoraUser] = useDeleteAgoraUserMutation()
    const [deleteUser] = useDeleteUserIfErrorMutation()
    //==========

    //state========
    const [formData, setFormData] = useState(baseData)
    const [firstPage,setFirstPage] = useState(true)

    //==============

    //useEffect==========
    useEffect(()=>{
        if(!mediatorData)return
        const cityChoose = formData['city']

        if(!cityChoose)return
        const cityId = addressData.find(city=>city.city===cityChoose)
        updateMediatorAddress({mediator_id:mediatorData.mediator.user.id,
            address_id:cityId.id,
            access:access})

    if(!mediatorError&&!updateAddressError&&!registerUserError)
            rediract('/admin')
    else{
        console.log(mediatorError,updateAddressError,registerUserError)
    }

    },[mediatorData]);
    //=============

    //handles========
    const handleChange = (event)=>{
        const {name, value} = event.target
        setFormData(prevState=>({...prevState,[name]:value}))
    };

    const handleClick = ()=>{
        setFormData(prevState=>({...prevState,certification_course: !prevState.certification_course}))
    };

    const isValidData = ()=>{
        const values= Object.values(formData)
        const userVal = values.splice(3)
        userVal.forEach(val=>{
            if(val===''){
                return false
            }
        })
        const arr = ['f','d','s']
        if(values.every((value, index) => value === arr[index]))
            return false
        
        return true
     


    }

    const handleSubmit =async ()=>{
        if(firstPage)return
        if(!isValidData()){
            trigerNotification('Please fill all fileds','error')
            return
        }
        const username = formData['username']
        const {data, error} =await isUsernameExist({username:username})
        const response = data ?? error
        
      
        if(response !== 'not found' && response !== false)return
        const phoneNumber = formData['phoneNumber']
        const residentData = {
            city:formData['city'],access:access
        }
        const userData = {
        first_name:formData['first_name'],
        last_name:formData['last_name'],
        email:formData['email'],
        access:access,
        username:username,
    }
        const mediatorData ={
        phone:phoneNumber,
        education:formData['education'],
        relevant_experience:formData['relevant_experience'],
        mediation_areas:formData['mediation_areas'],
        access:access,
        certification_course:formData['certification_course'],
        user:userData
    }
        Promise.all([
            addMediator(mediatorData),
            registerUser({username:userData.username,password:`Negoflict${phoneNumber}`,first_name:userData.username})
        ])
        .then(([addMediatorResponse,registerUserResponse])=>{
            console.log('register',registerUserResponse)
            console.log('add',addMediatorResponse)
            const {data} = registerUserResponse
            
            if(!data?.entities?.[0]?.uuid){

            if(data?.startsWith?.('agora error') &&addMediatorResponse?.error ){
         
                redirectOut()
            }
            if(data?.startsWith?.('agora error')&& !addMediatorResponse?.error){
                const {data} = addMediatorResponse
                const userId = data?.mediator?.user?.id
                
                deleteMediator({userId:userId})
                .then(()=>deleteUser({userId:userId}))
                .then(res=>console.log(res)).finally(()=>redirectOut())
                .finally(()=>redirectOut())
            }
        }

       
            if(addMediatorResponse?.error){
                deleteAgoraUser({username:userData.username})
                .then(res=>console.log('delete',res)).finally(()=>redirectOut())
            }
            trigerNotification('Mediator created successfully','success')
         
            return
        })
        .catch(res=>{
            console.log('inCatch',res)
            trigerNotification('Somthing went wrong','error')
            redirectOut()
        })
        
    };
    //==============

    //functions========
    const next = ()=>{
        setFirstPage(false)
    };
    const back = ()=>{
        if(firstPage)
            rediract('/admin')   
        setFirstPage(true)
    };
    const handleMediatorData = (data)=>{
        
        setFormData(prevState=>({...prevState,...data}))
        handleSubmit()
    };
    const redirectOut = ()=>{
        trigerNotification('Somthing went wrong','error')
        rediract('/admin',{replace:true})   
    }
    //============

    return(
        <div>
        {firstPage?(
        <AddUserPage 
            handleChange={handleChange}
            isMediator={true}
            userData={formData}
            next={next}
            goBack={back}
            options={addressData || []}
        />
        ):(
            <AddMediatorPage 
                goBack ={back}
                handleMediatorData={handleMediatorData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleClick={handleClick}
            />

        )}
        </div>
    )

}

export default CreateMediatorWrapper