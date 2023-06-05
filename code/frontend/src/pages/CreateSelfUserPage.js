
import UserForm from "../components/general/userForm"
import Header from "../components/general/Header"
import { useEffect, useState } from "react"
import Button from "../components/general/Button"
import { useRegisterOneUserMutation,useCreateContactMutation,useCreateUsersMutation,useLazyIsEmailExistQuery, useDeleteAgoraUserMutation, useDeleteUserIfErrorMutation } from "../store"
import { useSelector } from "react-redux"
import "../styles/pages/create_self_page.css"
import useValidateData from "../hooks/useValidate"
import { useNavigate } from "react-router-dom"
import useAlert from "../hooks/useAlert"

const CreateSelfUser = ({fulfiled,goBack})=>{
    //hooks===========================
    const navigate = useNavigate()
    const {clearValidate,validateData, addErrorLable} = useValidateData()
    const { trigerNotification } = useAlert()
    //state==========================
    const [formData,setFormData] = useState({})
    const [valid,setValid] = useState(true)
    const [disableButton,setDisableButton] = useState(false)
    const {id} = useSelector(state=>state.user)
    //api's==============================
    const [registerUser] = useRegisterOneUserMutation()
    const [createContact] = useCreateContactMutation()
    const [createUser] = useCreateUsersMutation()
    const [isEmailValid] = useLazyIsEmailExistQuery()
    const [deleteAgoraUser] = useDeleteAgoraUserMutation()
    const [deleteUser] = useDeleteUserIfErrorMutation()



    
    useEffect(()=>{
        if(Object.keys(formData).length >=4)
            setValid(false)
    },[formData])



    
    const handleChange = (event)=>{
        const {name, value} = event.target
        clearValidate(name)
        setFormData(prevState=>({...prevState,[name]:value}))
    }

    const handleSubmit =async (event)=>{
        event.preventDefault()
        setDisableButton(true)
        if(!validateData(formData,'createUser'))return
        const {phoneNumber,email,first_name, last_name} = formData
        const modEmail = email.replace(/[^\w\s]/gi, '')
        const modPass = `Negoflict${phoneNumber}`

        let { data, error } = await isEmailValid({ email:email });
          
          if (data === true || error) {
              console.log(`this email ${email} is already exist \n`)
              addErrorLable('email','createUser','email is already exist')
              return
          }
      
        Promise.all([
            registerUser({username:modEmail,password:modPass,first_name:first_name}),
            createUser({users:[{username:email,password:modPass,first_name:first_name,last_name:last_name, email:email}]})
        ])
        .then(async ([registerUserResponse, createUserResponse]) => {
            if(createUserResponse?.error || registerUserResponse?.error){
                if(createUserResponse?.error && registerUserResponse?.error)return
                if(!createUserResponse?.error && registerUserResponse?.error){
                    const {data:userDataArray} = createUserResponse
                    deleteUser({userId:userDataArray[0]?.id}).then(res=>console.log(res)).then(()=>handleBack())
                }
                else if(createUserResponse?.error && !registerUserResponse?.error)
                    deleteAgoraUser({username:modEmail})
                    .then(res=>console.log(res)).then(()=>handleBack())
            }
            console.log('register',registerUserResponse)
            console.log('create',createUserResponse)
            console.log(createUserResponse.data[0].id)
            return createContact({mediator_id:id,user_id:createUserResponse.data[0].id}).then(()=>{
                if(fulfiled)
                    fulfiled()
                else{
                    trigerNotification('User created successfully', 'success')
                    handleBack()
                }
            }).catch(err=>{
                trigerNotification('Somthing went wrong','error')
                console.log(err)
            })
                .finally(()=>setDisableButton(false))
        })
        .catch(err=>{ 
            trigerNotification('Somthing went wrong','error')
             console.log(err)
            })
        .finally(()=>setDisableButton(false))
    }
    const handleBack = ()=>{
        navigate(-1)

    }

    


    return(
        <article className="csp" style={{fontSize:fontSize}}>
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
                        onClick={goBack || handleBack}
                        text='Back'
                        size='small'
                        margin="0.5em"
                        disableSubmit={true}
                        disabled={disableButton}
                    />
                <Button 
                      
                      text='Submit'
                      size='small'
                      disabled={valid || disableButton}
                      margin="0.5em"
             

                  />
                </div>
            </form>
        </article>
    )

}
export default CreateSelfUser