import {react} from 'react'
import HeaderLarge from "../components/general/HeaderLarge.js"
import TextInput from "../components/general/TextInput.js"
 import Button from "../components/general/Button.js"
 

const LoginPage=()=>{
    


    return(
        <div className="login-page">

            <HeaderLarge />
                <h1 className="login-page--title">Log-in<br/>Mediator</h1>
                
            

            <form>
                <TextInput 
                            type="text"
                            placeHolder="Full Name"
                        />


                <TextInput 
                            type="email"
                            placeHolder="Email"
                        />

                <TextInput 
                            type="password"
                            placeHolder="Password"
                        />

                        <p>Disclaimer Lorem ispum dolor T&C <a href="#"> Link</a></p>

                        <Button text="Register" size="small"/>
                
                
            </form>

        </div>
)}
export default LoginPage