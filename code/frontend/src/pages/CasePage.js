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




const CasePage =({isMediator})=>{
    const [groups,setGroups] = useState([])
    const dispatch = useDispatch()
    const { getGropByUser } = useChat()
    let { username } = useSelector(state=>state.user)

    useEffect(()=>{
        getGroups()
    },[])
    

     const getGroups =async ()=>{
            
            username = isMediator? username: username.replace(/[^\w\s]/gi, '')
            console.log('in case page',username)
            
            const {data} = await getGropByUser(username)
            dispatch(addGroups(data))
            console.log(data)
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
