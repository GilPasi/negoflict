import PlusButton from "../components/general/icons/PlusButton"
import React, { useEffect } from "react"
import MyCases from "./rolePages/mediator/MyCases"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { addGroups } from "../store"
import { useLocation, useNavigate } from "react-router-dom"
import { useRef } from "react"
import  useAlert  from '../hooks/useAlert'
import { useGetGroupsByUserQuery } from "../store"
import Loader from "../components/general/Loader"
// eslint-disable-next-line no-unused-vars
// import WebIM from "../WebIM";


const CasePage =({isMediator})=>{
    //dont change the order***********
    //status= finished
    //change all fetch to redux-toolkit-query
    //use asyncronized fetch for better preformences
    //hooks==========
    const dispatch = useDispatch()
    const navigate = useNavigate()

 
    const location = useLocation()
    const quaryParams = new URLSearchParams(location.search)
    const open_close = quaryParams.get('open_close')
    const {trigerNotification} = useAlert()
    const {BandCase:is_banded} = useSelector(state=>state.band)
    // const {remove} = location.state || false
   
    
    //============


    //values=========
    let { username } = useSelector(state=>state.user)
    const {status} = location?.state || {}
    const {render} = location?.state || true
    const wasRenderd = useRef(render);
    //===========

    //middleware========
    username = isMediator? username: username.replace(/[^\w\s]/gi, '')
    const {data,error,isSuccess, refetch} = useGetGroupsByUserQuery({username:username})

    useEffect(() => {
        const remove = location.state?.remove;
        if (remove !== true) return;
    
        const newState = { ...location.state, remove: false };
        navigate(location.pathname, {state: newState, replace: true});
    
        refetch();
    }, [location.state, navigate, refetch]);


    //useEffects==========
    useEffect(()=>{
     
        if(wasRenderd.current || !status)return
        wasRenderd.current = true
        let title, icon

        if(status===200){
            title = 'Case created successfully'
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
                <div style={{
                    position:'fixed',
                    zIndex:'100',
                    width:'100%',
                    height:'100%',
                    opacity:'0.6',
                    backgroundColor:'gray',
                     left:'50%',
                     top:'50%',
                     transform:'translate(-50%,-50%)'}}>
                    <Loader withLogo={true} size={'medium'}/>
                </div>
            }
                <MyCases isMediator={isMediator} open_close={open_close}/>
                {isMediator&&<div className="centerizer">
                    <h1 className="title-large">Create new<br />Case</h1>
                    <PlusButton to="new_case"/>
                </div>}
        </article>
    )
}
export default CasePage
