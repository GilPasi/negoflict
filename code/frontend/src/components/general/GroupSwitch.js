
import {useEffect, useState} from 'react'
import "../../styles/components/group_switch.css"
import { useDispatch } from 'react-redux'
import { updatePosition } from '../../store'

const GroupSwitch =({isMediator})=>{

    const[selectorOffset , setSelectorOffset] = useState(50)
    const[selectedBtn , setSelectedBtn] = useState(2)
    const[selectorOffsetU , setSelectorOffsetU] = useState(5)
    const[selectedBtnU , setSelectedBtnU] = useState(2)
    //Actual needed values
    // const [notifArray , setNotifArray] = useState([false , false , false])
    const [notifArray , setNotifArray] = useState([false , true , true])//Mock for testing

    const dispatch = useDispatch()

    useEffect(()=>{
        
        const btnpos =  isMediator?selectedBtn:selectedBtnU
      
        dispatch(updatePosition(btnpos))

    },[selectedBtn,selectedBtnU])
    

    //Styling:
    const style ={
        width:isMediator ? "95%":"12.5em",
        height:isMediator ? "27.5px" : "2em",

    }

    //Determine offset :
    const selectorStyle={
        left : `${selectorOffset}%`,
        transform : `translateX(-${selectorOffset}%)`
    }
   

    const selectorStyleU={
        left : `50%`,
        transform : `translateX(${selectorOffsetU}%)`
    }

    

    const handleGroupSwapU=(btnPosition)=>{
        const offset = btnPosition === 2 ? 5 : -103
        setSelectorOffsetU(offset)
        setSelectedBtnU(btnPosition)
    }

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
       
    }
    //Notifications :
    const mockNotifications = [true , false , true] //HEN: replace with actual values
    const fetchedNotifs = [...mockNotifications]
    const handleNotifications =(clickedButton)=>{
        if(clickedButton){
                setNotifArray(()=>{
                    const newNotifArray = [...notifArray]
                    newNotifArray[clickedButton - 1] = false
                return newNotifArray
            })}

        else
            setNotifArray([...fetchedNotifs])
    }




    //Structure : 
    const mediatorVersion =(
                <div className="gs" style={style}>        
                    <button 
                        style={{
                            border:notifArray[0] && "2px solid #ffffff4e",
                            color : selectedBtn === 1 ?"white": "black"}}
                        className="gs--btn"  
                        onClick={()=>{
                            handleGroupSwap(1)
                            handleNotifications(1)
                            }}>
                        <p  className="gs--btn-content">Party A</p>

                        {notifArray[0] &&<div className="gs--parallelogram">
                            <div className="gs--triangle-up"/>
                            <div className="gs--triangle-bot"/>
                        </div>}

                    </button>
                    <button 
                        style={{
                            border:notifArray[1] && "2px solid #ffffff4e",
                            color : selectedBtn === 2 ?"white": "black"}}
                         className="gs--btn"  
                         onClick={()=>{
                            handleGroupSwap(2)
                            handleNotifications(2)
                            }}>
                        <p className="gs--btn-content">Main</p>

                        {notifArray[1] &&<div className="gs--parallelogram">
                            <div className="gs--triangle-up"/>
                            <div className="gs--triangle-bot"/>
                        </div>}

                    </button>
                    <button 
                        style={{
                            border:notifArray[2] && "2px solid #ffffff4e",
                            color : selectedBtn === 3 ?"white": "black"}}
                         className="gs--btn"  
                         onClick={()=>{
                            handleGroupSwap(3)
                            handleNotifications(3)
                            }}>
                        <p className="gs--btn-content">Party B</p> 
                        {notifArray[2] &&<div className="gs--parallelogram">
                            <div className="gs--triangle-up"/>
                            <div className="gs--triangle-bot"/>
                        </div>}
                    </button>
                    <div className="gs-selector" style={selectorStyle}></div>
                </div>)

    const userVersion=(   
                <div className="gs" style={{justifyContent: 'center'}}>
                    <button id="gs--pa"
                     style={{color : selectedBtnU === 1 ?"white": "black",
                     border:notifArray[0] && "2px solid #ffffff4e",}}
                      className="gs--btn gs--btn-uv"
                        
                      onClick={()=>{
                        handleGroupSwapU(1)
                            handleNotifications(1)
                            }}
                    >
                        <p  className="gs--btn-content">Me & Mediator</p>
                        {notifArray[0] &&<div className="gs--parallelogram">
                            <div className="gs--triangle-up"/>
                            <div className="gs--triangle-bot"/>
                        </div>}
                         </button>
                        <div className="gs--spacer" />
                    <button
                         style={{color: selectedBtnU === 2 ? "white" : "black",
                            border:notifArray[1]&& "2px solid #ffffff4e",}}
                         className="gs--btn"
                         
                         onClick={()=>{
                            handleGroupSwapU(2)
                            handleNotifications(2)
                            }}>
                        <p id="gs--pb" className="gs--btn-content">Main</p>
                        {notifArray[1] &&<div className="gs--parallelogram">
                            <div className="gs--triangle-up"/>
                            <div className="gs--triangle-bot"/>
                        </div>}
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

