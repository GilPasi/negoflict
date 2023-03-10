
import { Routes,Route } from "react-router-dom";
import AdminMenu from "./roleMenu/admin_menu.js";
import AddMediator from './rolePages/admin/AddMediator'


import React from 'react'



const UserLandingPage = () => {
   

 
}


const MediatorLandingPage = ()=>{

}



const SuperUserLandingPage = ()=>{
    

    return(
        <div>
                <Routes>
                    <Route path="/addmediator" element={<AddMediator/>}/>
                    <Route path="/" element={<AdminMenu/>}/>
                </Routes>
                
                

            
        </div>
    )

}



export {UserLandingPage, MediatorLandingPage, SuperUserLandingPage}