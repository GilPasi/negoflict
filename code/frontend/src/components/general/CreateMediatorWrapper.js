import AddMediatorPage from "../../pages/AddMediatorPage"
import AddUserPage from "../../pages/AddUserPage"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUpdateMediatorResidentMutation,useAddMediatorMutation, useGetAddressesQuery, useLazyIsUsernameExistQuery, useRegisterOneUserMutation } from "../../store"
import { useSelector } from "react-redux"

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
    const [addMediator,{data:mediatorData, error:mediatorError}] = useAddMediatorMutation()
    const [registerUser, {error:registerUserError}] = useRegisterOneUserMutation()
    const [isUsernameExist,{data:isUserName}] = useLazyIsUsernameExistQuery()
    const [updateMediatorAddress,{data:updateAddressData,error:updateAddressError}] = useUpdateMediatorResidentMutation()
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
    const handleSubmit =async ()=>{
        if(firstPage)return
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
        addMediator(mediatorData)
        registerUser({username:userData.username,password:'Negoflict123',first_name:userData.username})
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