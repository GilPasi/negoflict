import { useSelector } from "react-redux";
import { Routes,Route } from "react-router-dom";
import {getPerm} from '../utils/permissions.js'
import { useState } from "react";
import AdminMenu from "./roleMenu/admin_menu.js";
import AddMediator from './rolePages/admin/AddMediator'


import React from 'react'
import { RegisterNewChatUser } from "../api_handler/server_to_agora.js";


const UserLandingPage = () => {
    const user = useSelector(state=>state.user)
    
    
    const contant = (<div><h1>hello name: {user.username} </h1></div>)

    
  
    return contant
 
}


const MediatorLandingPage = ()=>{

}



const SuperUserLandingPage = ()=>{
    const me = useSelector(state=>state.user)

    const [user,setUser] = useState({})

    const handleChange = ({currentTarget:input})=>{
        const {name,value} = input

        setUser(prevState=>({...prevState,[name]:value}))
    }

    const handleSubmit = (event)=>{
        event.preventDefault()
        const {username, password} = user

        const newUser =RegisterNewChatUser(me,username,password)
        console.log(newUser)
    }

    return(
        <div>
            {/* <h1>hello</h1>
            <Link to='/chat'>
            <button>start chat</button>
            </Link> */}
            {/* <form
                onSubmit={handleSubmit}>
                    <input
                        type='text'
                        onChange={handleChange}
                        name='username'
                        placeholder="username"
                        />
                    <input
                        type='text'
                        onChange={handleChange}
                        name='password'
                        placeholder="password"
                        />

                    <button
                        type="submit">
                            <h3>submit</h3>
                        </button>
                </form> */}
                <Routes>
                    <Route path="/addmediator" element={<AddMediator/>}/>
                    <Route path="/" element={<AdminMenu/>}/>
                </Routes>
                
                

            
        </div>
    )

}



export {UserLandingPage, MediatorLandingPage, SuperUserLandingPage}