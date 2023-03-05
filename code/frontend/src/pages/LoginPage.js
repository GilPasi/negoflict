import HeaderLarge from "../components/general/HeaderLarge.js"
import TextInput from "../components/general/TextInput.js"
import Button from '../components/general/Button'
import { useEffect, useState } from "react"
import {GetJWTToken, GetUserId, ValidateEmail} from "../api_handler/submit.js"
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/index'
import { useNavigate } from "react-router-dom"




const LoginPage=()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state=>state.user)    
    
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
    const userId =await GetUserId(formData.username,access)

    const {username,email} = formData
    dispatch(login({
        id:userId,
        username:username,
        email:email,
        refreshToken:refresh,
        accessToken:access
    }))
    setNullFields()
   
    navigate('/welcome')
    
}
    const setNullFields = ()=>[
        setFormData({})
    ]


    return(
        <div className="login-page">
            

            <HeaderLarge />
                <h1 className="login-page--title">Log-in<br/>Mediator</h1>
                
            

            <form onSubmit={submitHandler}>
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
)}
export default LoginPage