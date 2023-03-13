import "../styles/login_page.css"
import Header from "../components/general/Header"
import TextInput from "../components/general/TextInput"
import Button from '../components/general/Button'
import { useEffect, useState } from "react"
import {GetJWTToken, GetUserId, ValidateEmail, GetRole, GetNewAccessToken,LogOut} from "../api_handler/submit.js"
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/index'
import { useNavigate } from "react-router-dom"







const LoginPage=()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state=>console.log(state.user))
    

    useEffect(()=>{
        LogOut()
    })

   
    
    
    const [formData,setFormData] = useState({})

    const handleChange = ({currentTarget:input})=>{
        const {name,value} = input

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
          }))
    }
    


   const submitHandler =async (event,term)=>{
   
    event.preventDefault()
    const validEmail =await ValidateEmail(formData.email)

    if(!validEmail)
        return

    const {refresh,access} = await GetJWTToken(formData)
    const {id,first_name} =await GetUserId(formData.username,access)
    const role = await GetRole(id,access)
    

    const {username,email} = formData
    dispatch(login({
        id:id,
        firstName:first_name,
        username:username,
        email:email,
        refreshToken:refresh,
        accessToken:access,
        role:role
    }))
    setNullFields()
    
    switch(role){
        case 1:{
            navigate('/admin')
            GetNewAccessToken()
            break;
        }
        case 2:{
            navigate('/mediator')
            break
        }
        case 3:{
            navigate('/user')
            break
        }
        default:
            navigate('/login')
    }
   
    
    
}
    const setNullFields = ()=>[
        setFormData({})
    ]


    return(
        <div className="lp">
            <div className="limiter">
                <Header isLarge={true} />
                <h1 className="lp--title">Log-in<br/>Mediator</h1>

                <form onSubmit={submitHandler} className="lp--form">
                    <TextInput 
                                type="text"
                                placeHolder="Username"
                                onChange = {handleChange}
                                name = 'username'
                            />


                    <TextInput 
                                type="email"
                                placeHolder="Email"
                                onChange = {handleChange}
                                name='email'
                            />

                    <TextInput 
                                type="password"
                                placeHolder="Password"
                                onChange = {handleChange}
                                name='password'
                            />

                            <p>Disclaimer Lorem ispum dolor T&C <a href="#"> Link</a></p>
                    <Button  text="Submit" size="small"/>
                </form> 

                <p>{()=>console.log(user)}</p>

            </div>
        </div>
)}
export default LoginPage