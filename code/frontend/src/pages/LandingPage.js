import { Routes,Route } from "react-router-dom";
import AdminMenu from "./roleMenu/admin_menu.js";
import AddMediator from './rolePages/admin/AddMediator'
import ChatPage from './rolePages/mediator/Chatpage.js'
import MediatorMenu from "./rolePages/mediator/MediatorMenu.js";
import CaseFormPage from "./CaseFormPage.js";
import CreateUserWraper from "../components/general/CreateUserWrapper.js";



import React from 'react'
import CasePage from "./CasePage.js";



const UserLandingPage = () => {

    return (
        <Routes>
            <Route path="/" element = {<CasePage isMediator={false}/>}/>
            <Route path="/chat/*" element={<ChatPage isMediator={false}/>}/>
            {/* <Route path="/" element={}/> */}
        </Routes>
    )
}
const MediatorLandingPage = ()=>{
    return (
        <Routes>
            <Route path="/" element={<MediatorMenu/>}/>
            <Route path="/chat/*" element={<ChatPage isMediator={true}/>}/>
            <Route path="/cases" element={<CasePage isMediator={true}/>}/>
            <Route path="cases/new_case" element={<CaseFormPage/>}/>
            <Route path="create_users" element={<CreateUserWraper/>}/>
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