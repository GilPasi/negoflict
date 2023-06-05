import {useEffect, useState} from 'react'
import "../../styles/components/group_switch.css"
import {useDispatch, useSelector} from 'react-redux'
import {updatePosition} from '../../store'
import {getPermName} from "../../utils/permissions";
import useChat from "../../hooks/useChat";
import {useLocation} from "react-router-dom";

const GroupSwitch =()=>{

    //hooks================
    const {MsgListener, removeEventById} = useChat()
    const {role} = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const location = useLocation()
    //===================================================================================================
    //variables================
    const roleName = getPermName({role})
    const isMediator = roleName==='mediator'
    const {groups} = location.state || []
    //===================================================================================================
    //state================
    const [selectorOffset , setSelectorOffset] = useState(50)
    const [selectedBtn , setSelectedBtn] = useState(2)
    const [selectorOffsetU , setSelectorOffsetU] = useState(5)
    const [selectedBtnU , setSelectedBtnU] = useState(2)
    const [notification,setNotification] = useState(()=>isMediator?[false,false,false]:[false,false])
    const [NotificationQueue,setNotificationQueue] = useState([])
    //===================================================================================================



    //useEffect================
    useEffect(()=>{
        MsgListener({handleMessage:handleNotificationsView, id:'GroupSwitch'})
        

        return ()=>{
            removeEventById({id:'GroupSwitch'})

        }
    },[]);



    useEffect(()=>{
        const btnpos =  isMediator?selectedBtn:selectedBtnU
        handleNotifications(btnpos,false)
        dispatch(updatePosition(btnpos))
    },[selectedBtn,selectedBtnU]);
    //===================================================================================================

    //style================
    //Styling:
    const style ={
        width:isMediator ? "95%":"12.5em",
        height:isMediator ? "27.5px" : "2em",
    };
    //Determine offset :
    const selectorStyle={
        left : `${selectorOffset}%`,
        transform : `translateX(-${selectorOffset}%)`
    };
    const selectorStyleU={
        left : `50%`,
        transform : `translateX(${selectorOffsetU}%)`
    };
    //===================================================================================================

    //functions================
    const handleGroupSwapU=(btnPosition)=>{
        const offset = btnPosition === 2 ? 5 : -103
        setSelectorOffsetU(offset)
        setSelectedBtnU(()=>btnPosition)
    };
    const handleGroupSwap=(btnPosition)=>{
        let offset = 0
        switch(btnPosition) {
            case 1:
                offset = 0.4;
                break;
            case 2:
                offset = 50;
                break;
            case 3:
                offset = 99.6;
                break;
        }
        setSelectorOffset(offset)
        setSelectedBtn(btnPosition)
    };

    //Notifications :
    const handleNotifications =(clickedButton,value)=>{

        setNotification(prevNotification => [
            ...prevNotification.slice(0, clickedButton - 1),
                    value,
            ...prevNotification.slice(clickedButton)
  ])
    };

    const handleNotificationsView =({to})=>{
        setNotificationQueue(prev=>[...prev,to])
    }

    useEffect(()=>{
        if(NotificationQueue.length === 0)return

        NotificationQueue.forEach(to=>{
            const groupTo = groups.find(group=>group.groupid===to)?.groupname
            if(!groupTo)return
            const btnpos =  isMediator?selectedBtn:selectedBtnU
            console.log('GroupTo',groupTo)
            console.log('pos',btnpos)
            if(groupTo.endsWith('G')){
                if(btnpos === 2)return
                handleNotifications(2,true)
            }
            else if(groupTo.endsWith('A') || !isMediator){
                if(btnpos === 1)return
                handleNotifications(1,true)
            }
            else{
                if(isMediator&& btnpos === 3)return
                else if(btnpos === 1)return
                handleNotifications(3,true)
            }
        })
        return ()=>setNotificationQueue([])

    },[NotificationQueue])
    //===================================================================================================

    //Structure : 
    const mediatorVersion =(
                <div className="gs" style={style}>        
                    <button 
                        style={{
                            border:
                                notification[0] &&
                                "2px solid #ffffff4e",
                            color : selectedBtn === 1 ?"white": "black"}}
                        className="gs--btn"  
                        onClick={()=>{
                            handleGroupSwap(1)
                            // handleNotifications(1,false)
                            }}>
                        <p  className="gs--btn-content">Party A</p>

                        {notification[0] &&<div className="gs--parallelogram"/>}

                    </button>
                    <button 
                        style={{
                            border:
                                notification[1]
                                &&
                            "2px solid #ffffff4e",
                            color : selectedBtn === 2 ?"white": "black"}}
                         className="gs--btn"  
                         onClick={()=>{
                            handleGroupSwap(2)
                            // handleNotifications(2,false)
                            }}>
                        <p className="gs--btn-content">Main</p>

                        {notification[1] &&<div className="gs--parallelogram"/>}

                    </button>
                    <button 
                        style={{
                            border:
                                notification[2] &&
                                "2px solid #ffffff4e",
                            color : selectedBtn === 3 ?"white": "black"}}
                         className="gs--btn"  
                         onClick={()=>{
                            handleGroupSwap(3)
                            // handleNotifications(3,false)
                            }}>
                        <p className="gs--btn-content">Party B</p> 
                        {notification[2] &&<div className="gs--parallelogram"/>}
                    </button>
                    <div className="gs-selector" style={selectorStyle}></div>
                </div>)

    const userVersion=(   
                <div className="gs" style={{justifyContent: 'center'}}>
                    <button id="gs--pa"
                     style={{color :selectedBtnU === 1 ?"white": "black",
                     border:notification[0]&& "2px solid #ffffff4e"
                         ,}}
                      className="gs--btn gs--btn-uv"
                        
                      onClick={()=>{
                        handleGroupSwapU(1)
                            // handleNotifications(1,false)
                            }}
                    >
                        <p  className="gs--btn-content">Me & Mediator</p>
                        {notification[0] &&<div className="gs--parallelogram"/>}
                         </button>
                        <div className="gs--spacer" />
                    <button
                         style={{color: selectedBtnU === 2 ? "white" : "black",
                            border:notification[1]&& "2px solid #ffffff4e"
                             ,}}
                         className="gs--btn"
                         
                         onClick={()=>{
                            handleGroupSwapU(2)
                            // handleNotifications(2,false)
                            }}>
                        <p id="gs--pb" className="gs--btn-content">Main</p>
                        {notification[1] &&<div className="gs--parallelogram"/>}
                        </button>
                    
                    <div className="gs-selector" style={selectorStyleU}></div>
                </div>)


    return(
        <div >
            {isMediator? mediatorVersion : userVersion}
        </div>

        )
}
export default GroupSwitch

