import AddMediatorPage from "../../pages/AddMediatorPage"
import AddUserPage from "../../pages/AddUserPage"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAddResidentMutation, useUpdateMediatorResidentMutation,useAddMediatorMutation } from "../../store"
import { useSelector } from "react-redux"


const CreateMediatorWrapper = ()=>{
    const {access} = useSelector(state=>state.user)

    const rediract = useNavigate()
    const [addResident,{data:residetData, error:residentError}] = useAddResidentMutation()
    const [addMediator,{data:mediatorData, error:mediatorError}] = useAddMediatorMutation()
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
    console.log(formData)
    const handleSubmit =async ()=>{
        if(firstPage)return
        const phoneNumber = formData['phoneNumber']
        const residentData = {city:formData['city'],access:access}

        const userData = {first_name:formData['first_name'],
        last_name:formData['last_name'],
        email:formData['email'],
        password:phoneNumber,
        access:access}

        const mediatorData = {phone:phoneNumber,
        education:formData['education'],
        relevant_experience:formData['relevant_experience'],
        mediation_areas:formData['mediation_areas'],
        access:access,
        user:userData}



        // addMediator(mediatorData)
        console.log(residentData)
       const res =await addResident(residentData)
       console.log(res)
    }



    return(
        <div>
        {firstPage?(
        <AddUserPage 
        handleChange={handleChange}
        isMediator={true}
        userData={formData}
        next={next}
        goBack={back}
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