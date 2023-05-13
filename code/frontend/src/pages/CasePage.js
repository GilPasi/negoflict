import Header from "../components/general/Header"
import PlusButton from "../components/general/PlusButton"
import React, { useEffect } from "react"
import MyCases from "./rolePages/mediator/MyCases"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { addGroups } from "../store"
import { useLocation } from "react-router-dom"
import { useRef } from "react"
import  useAlert  from '../hooks/useAlert'
import { useGetGroupsByUserQuery } from "../store"
import Loader from "../components/general/Loader"


const CasePage =({isMediator})=>{
    //dont change the order***********
    //status= finished
    //change all fetch to redux-toolkit-query
    //use asyncronized fetch for better preformences
    //hooks==========
    const dispatch = useDispatch()
 
    const location = useLocation()
    const quaryParams = new URLSearchParams(location.search)
    const open_close = quaryParams.get('open_close')
    const {trigerNotification} = useAlert()
    const {BandCase:is_banded} = useSelector(state=>state.band)
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
    },[])

     useEffect(()=>{
        if(!isSuccess)return
            dispatch(addGroups(data))
        if(error)
            alert('error please render the page')
        
     },[isSuccess,error,data]);
    //===============
    // ************
    

    return(
        <article>
            {is_banded &&
                <div className="loader-box-selector" style={{position:'fixed',zIndex:'100',width:'100%',height:'100%',opacity:'0.6',backgroundColor:'gray', left:'50%',top:'50%',transform:'translate(-50%,-50%)'}}>
                    <Loader withLogo={true} size={'medium'}/>
                </div>
            }
            <Header isLarge={true}/>
                <MyCases isMediator={isMediator} open_close={open_close}/>
                {isMediator&&<div className="centerizer">
                    <h1 className="title">Create a new<br />Case</h1>
                    <PlusButton to="new_case"/>
                </div>}
        </article>
    )
}
export default CasePage
