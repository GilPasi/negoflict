import AddMediatorPage from "../../pages/AddMediatorPage"
import AddUserPage from "../../pages/AddUserPage"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAddResidentMutation, useUpdateMediatorResidentMutation,useAddMediatorMutation, useGetAddressesQuery, useLazyIsUsernameExistQuery } from "../../store"
import { useSelector } from "react-redux"


const CreateMediatorWrapper = ()=>{
    const {access} = useSelector(state=>state.user)

    const rediract = useNavigate()
    const {data:addressData, error:addressError} = useGetAddressesQuery({access:access})
    const [addResident,{data:residetData, error:residentError}] = useAddResidentMutation()
    const [addMediator,{data:mediatorData, error:mediatorError}] = useAddMediatorMutation()
    const [isUsernameExist] = useLazyIsUsernameExistQuery()
    const [updateMediatorAddress] = useUpdateMediatorResidentMutation()

    const [formData, setFormData] = useState({})
    const [firstPage,setFirstPage] = useState(true)
    const [disable,setDisable] = useState(false)
   

    useEffect(()=>{
        if(residentError || mediatorError )return
        if(!residetData || !mediatorData)return
        updateMediatorAddress({mediator_id:mediatorData.id,
            address_id:residetData.id,
            access:access})
        // setDisable(false)
    },[residetData,mediatorData,residentError,mediatorError])


    const handleChange = (event)=>{
        const {name, value} = event.target
        setFormData(prevState=>({...prevState,[name]:value}))
    }
    const next = ()=>{
        setFirstPage(false)
    }
    const back = ()=>{
        if(firstPage)
            rediract('/admin')   

        setFirstPage(true)
    }
    const handleMediatorData = (data)=>{
        setFormData(prevState=>({...prevState,...data}))
        handleSubmit()
    }
    
    const handleSubmit =async ()=>{
        if(firstPage)return
        const username = formData['username']


        const {data, error} =await isUsernameExist({username:username})

        const response = data ?? error

        if(response !== 'not found')return

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

    console.log('data',mediatorData)



       const check = await addMediator(mediatorData)
       
        // addResident(residentData)
       
    }
    if(mediatorData)
        console.log('mediatordata',mediatorData)
    if(mediatorError)
        console.log('mediatorError',mediatorError)


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
            disable={disable}
            goBack ={back}
            handleMediatorData={handleMediatorData}
            
            />

        )}
        </div>
    )

}

export default CreateMediatorWrapper