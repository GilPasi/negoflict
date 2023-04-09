import "../styles/pages/case_page.css"
import Header from "../components/general/Header"
import React, { useEffect } from "react"
import MyCases from "./rolePages/mediator/MyCases"
import { Link } from "react-router-dom"
import useChat from "../hooks/useChat"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { addGroups } from "../store"
import { useLocation } from "react-router-dom"
import { useRef } from "react"
import  useAlert  from '../hooks/useAlert'
import { useGetGroupsByUserQuery } from "../store"





const CasePage =({isMediator})=>{
    //dont change the order***********
    //status= finished
    //change all fetch to redux-toolkit-query
    //use asyncronized fetch for better preformences
    //hooks==========
    const dispatch = useDispatch()
 
    const location = useLocation()
    const {trigerNotification} = useAlert()
    //============

    //values=========
    let { username } = useSelector(state=>state.user)
    const {status} = location?.state || {}
    const {render} = location?.state || true
    const wasRenderd = useRef(render);
    //===========

    //middleware========
    username = isMediator? username: username.replace(/[^\w\s]/gi, '')
    const {data,error,isSuccess} = useGetGroupsByUserQuery({username:username})
  
    //useEffects==========
    useEffect(()=>{
     
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
    },[]);

     useEffect(()=>{
        if(!isSuccess)return
            dispatch(addGroups(data.data))
            console.log('grooopppp===>>>in case page ',data.data)
        if(error)
            alert('error please render the page')
        
     },[isSuccess,error,data]);
    //===============
    // ************
    

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
