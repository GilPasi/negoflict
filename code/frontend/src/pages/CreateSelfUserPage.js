
import UserForm from "../components/general/userForm"
import Header from "../components/general/Header"
import { useEffect, useState } from "react"
import Button from "../components/general/Button"
import { useRegisterOneUserMutation, } from "../store"

const CreateSelfUser = ()=>{
    const [formData,setFormData] = useState({})
    const [valid,setValid] = useState(true)
    
    useEffect(()=>{
        if(Object.keys(formData).length >=4)
            setValid(false)
    },[formData])

    
    const handleChange = (event)=>{
        const {name, value} = event.target
        setFormData(prevState=>({...prevState,[name]:value}))
    }

    const handleSubmit = (event)=>{
        event.preventDefault()
        console.log(formData)
    }


    return(
        <div>
            <form>
                <Header/>
                <UserForm
                 userData={formData}
                 handleChange={handleChange}
                 required={true}
                 />

                 <Button text={'Submit'} size={'medium'} disabled={valid}/>
            </form>
        </div>
    )

}
export default CreateSelfUser