import { Routes,Route } from "react-router-dom";
import AdminMenu from "./roleMenu/admin_menu.js";
import AddMediator from './rolePages/admin/AddMediator'
import ChatPage from './rolePages/mediator/Chatpage'
import MediatorMenu from "./rolePages/mediator/MediatorMenu.js";
import MyCases from "./rolePages/mediator/MyCases.js";


import React from 'react'



const UserLandingPage = () => {

    return (
        <Routes>
            <Route path="/" element={<ChatPage isMediator={false}/>}/>
            {/* <Route path="/" element={}/> */}
        </Routes>
    )
}
const MediatorLandingPage = ()=>{
    return (
        <Routes>
            <Route path="/" element={<MediatorMenu/>}/>
            <Route path="/chat" element={<ChatPage isMediator={true}/>}/>
            <Route path="/cases" element={<MyCases/>}/>
            {/* <Route path="/" element={}/> */}
        </Routes>
    )
    

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