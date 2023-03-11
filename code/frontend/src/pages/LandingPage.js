import { Routes,Route } from "react-router-dom";
import AdminMenu from "./roleMenu/admin_menu.js";
import AddMediator from './rolePages/admin/AddMediator'
import ChatPage from './rolePages/mediator/Chatpage'


import React from 'react'



const UserLandingPage = () => {

    return (
        <Routes>
            <Route path="/" element={<ChatPage/>}/>
            {/* <Route path="/" element={}/> */}
        </Routes>
    )
}
const MediatorLandingPage = ()=>{
    

}



const SuperUserLandingPage = ()=>{
    

    return(
        
                <Routes>
                    <Route path="/addmediator" element={<AddMediator/>}/>
                    <Route path="/" element={<AdminMenu/>}/>
                </Routes>
                
                

            
      
    )

}



export {UserLandingPage, MediatorLandingPage, SuperUserLandingPage}