import {react} from 'react'
import HeaderLarge from "./generals/HeaderLarge.js"
import TextInput from "./generals/TextInput.js"
 import Button from "./generals/Button.js"
 

export default function LoginPage(){
    return(

        <div className="login-page">

            <HeaderLarge />
                <h1 className="login-page--title">Log-in<br/>Mediator</h1>
                
            

            <form>
                <TextInput 
                            type="text"
                            placeHolder="User Name"
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