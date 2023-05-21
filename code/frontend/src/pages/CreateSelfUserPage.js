
import UserForm from "../components/general/userForm"
import Header from "../components/general/Header"
import { useEffect, useState } from "react"
import Button from "../components/general/Button"
import { useRegisterOneUserMutation,useCreateContactMutation,useCreateUsersMutation,useLazyIsEmailExistQuery } from "../store"
import { useSelector } from "react-redux"
import "../styles/pages/create_self_page.css"
import useValidateData from "../hooks/useValidate"

const CreateSelfUser = ({fulfiled,goBack})=>{
    const {clearValidate,validateData} = useValidateData()
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

    console.log(formData)

    
    const handleChange = (event)=>{
        const {name, value} = event.target
        setFormData(prevState=>({...prevState,[name]:value}))
    }

    const handleSubmit =async (event)=>{
        console.log("HERE")
        event.preventDefault()
        if(!validateData(formData,'createUser'))return
        const {phoneNumber,email,first_name, last_name} = formData
        const modEmail = email.replace(/[^\w\s]/gi, '')
        const modPass = `Negoflict${phoneNumber}`

        let { data, error } = await isEmailValid({ email:email });
          
          if (data === true || error) {
              console.log(`this email ${email} is already exist \n`)
              return
          }

          console.log('askdfkasdkfasdfasd',formData)

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
        <article className="csp">
        <Header/>
            <h1 className="title-large">Create a new user</h1>
            <form className="centerizer" onSubmit={handleSubmit} >
                <UserForm
                    userData={formData}
                    handleChange={handleChange}
                    required={true}
                />
                <div className="aligner">
                <Button 
                      
                        text='Submit'
                        size='small'
                        disabled={valid}
                        margin="0.5em"

                    />
                <Button
                        onClick={goBack}
                        text='Back'
                        size='small'
                        margin="0.5em"
                        disableSubmit={true}
                    />
                </div>
            </form>
        </article>
    )

}
export default CreateSelfUser