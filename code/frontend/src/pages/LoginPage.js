import HeaderLarge from "../components/general/HeaderLarge.js"
import TextInput from "../components/general/TextInput.js"
import Button from '../components/general/Button'
import { useState } from "react"
import GetJWTToken from "../api_handler/submit.js"



const LoginPage=()=>{
    
    const [formData,setFormData] = useState({})

    const handleChange = ({currentTarget:input})=>{
        const {name,value} = input

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
          }))
    }
    


   const submitHandler = (event,term)=>{
    event.preventDefault()
    const userDetail = formData
    GetJWTToken(userDetail)

}


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

        </div>
)}
export default LoginPage