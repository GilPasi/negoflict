import "../styles/pages/case_page.css"
import Header from "../components/general/Header"
import React, { useEffect } from "react"
import MyCases from "./rolePages/mediator/MyCases"
import { Link } from "react-router-dom"
import useChat from "../hooks/useChat"
import { useSelector } from "react-redux"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addGroups } from "../store"
import { useLocation } from "react-router-dom"
import { useRef } from "react"
import  useAlert  from '../hooks/useAlert'




const CasePage =({isMediator})=>{
    //hooks==========
    const dispatch = useDispatch()
    const { getGropByUser } = useChat()
    const location = useLocation()
    const {trigerNotification} = useAlert()
    //============

    //values=========
    let { username } = useSelector(state=>state.user)
    const {status} = location?.state || {}
    const {render} = location?.state || true
    const wasRenderd = useRef(render);
    //===========
  

 
  
   

    useEffect(()=>{
        getGroups()

        if(wasRenderd.current || !status)return
        wasRenderd.current = true
        let title, icon

        if(status===200){
            title = 'Case created successfuly'
            icon = 'success'
            
        }
        else{
            title = 'Case was not created'
            icon = 'error'
        }
        trigerNotification(title,icon)
    

    },[])
    

     const getGroups =async ()=>{
            
            username = isMediator? username: username.replace(/[^\w\s]/gi, '')
            console.log('username',username)
            const {data} = await getGropByUser(username)
            dispatch(addGroups(data))
        }

    

    return(
        <article className="cap">
            <Header isLarge={true}/>
                <MyCases isMediator={isMediator}/>
                {isMediator?(
                    <><h1 className="cap--title">Create a new<br />Case</h1><Link to="new_case">
                        <div className="cap--plus-wrapper">
                            <div className="cap--plus">
                                <div className="cap--line" id="cap--line-ver"></div>
                                <div className="cap--line" id="cap--line-hor"></div>
                            </div>
                        </div>
                    </Link></>

                ):(<div></div>)}
                
             
           
        </article>
    )
}
export default CasePage
