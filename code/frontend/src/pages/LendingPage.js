import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getPerm} from '../utils/permissions.js'

import React from 'react'


const UserLandingPage = () => {
    const user = useSelector(state=>state.user)
    
    
    const contant = (<div><h1>hello name: {user.username} </h1></div>)

    
  
    return contant
 
}


const MediatorLandingPage = ()=>{

}



const SuperUserLandingPage = ()=>{

    return(
        <div>
            <h1>hello</h1>
            <button>start chat</button>
        </div>
    )

}



export {UserLandingPage, MediatorLandingPage, SuperUserLandingPage}