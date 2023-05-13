
import UserForm from "../components/general/userForm"
import Header from "../components/general/Header"
import { useEffect, useState } from "react"
import Button from "../components/general/Button"
import { useRegisterOneUserMutation,useCreateContactMutation,useCreateUsersMutation,useLazyIsEmailExistQuery } from "../store"
import { useSelector } from "react-redux"

const CreateSelfUser = ({fulfiled,goBack})=>{
    const [formData,setFormData] = useState({})
    const [valid,setValid] = useState(true)
    const [registerUser] = useRegisterOneUserMutation()
    const [createContact] = useCreateContactMutation()
    const [createUser] = useCreateUsersMutation()
    const [isEmailValid] = useLazyIsEmailExistQuery()
    const {id} = useSelector(state=>state.user)
    
    useEffect(()=>{
        if(Object.keys(formData).length >=4)
            setValid(false)
    },[formData])

    
    const handleChange = (event)=>{
        const {name, value} = event.target
        setFormData(prevState=>({...prevState,[name]:value}))
    }

    const handleSubmit =async (event)=>{
        event.preventDefault()
        const {phoneNumber,email,first_name, last_name} = formData
        const modEmail = email.replace(/[^\w\s]/gi, '')
        const modPass = `Negoflict${phoneNumber}`

        let { data, error } = await isEmailValid({ email:email });
          
          if (data === true || error) {
              console.log(`this email ${email} is already exist \n`)
              return
          }

        registerUser({username:modEmail,password:modPass,first_name:first_name})
        .catch(err=>console.log(err))
        createUser({users:[{username:email,password:modPass,first_name:first_name,last_name:last_name, email:email}]}).then(res=>{
            console.log('medi: ',id)
            console.log('user ',res.data[0].id)
            console.log(res)
            createContact({mediator_id:id,user_id:res.data[0].id})
            .then(()=>fulfiled())
            .catch(err=>{
                console.log(err)
                // fulfiled()

            })
        })
        .catch(err=>console.log(err))
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

                 <Button onClick={handleSubmit} text={'Submit'} size={'medium'} disabled={valid}/>
                 <Button onClick={goBack} text={'Back'} size={'medium'}/>
            </form>
        </div>
    )

}
export default CreateSelfUser