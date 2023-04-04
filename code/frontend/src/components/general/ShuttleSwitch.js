
import {useEffect, useState} from 'react'
import "../../styles/components/shuttle_switch.css"
import { useDispatch } from 'react-redux'
import { updatePosition } from '../../store'

const ShuttleSwitch =({isMediator})=>{

    const[selectorOffset , setSelectorOffset] = useState(50)
    const[selectedBtn , setSelectedBtn] = useState(2)
    const[selectorOffsetU , setSelectorOffsetU] = useState(5)
    const[selectedBtnU , setSelectedBtnU] = useState(2)
    
    const dispatch = useDispatch()

    useEffect(()=>{
        
        
        const btnpos =  isMediator?selectedBtn:selectedBtnU
      
        dispatch(updatePosition(btnpos))

    },[selectedBtn,selectedBtnU])
    

    const style ={
        width:isMediator ? "95%":"12.5em",
        height:isMediator ? "27.5px" : "2em",

    }

    const selectorStyle={
        left : `${selectorOffset}%`,
        transform : `translateX(-${selectorOffset}%)`
    }
   

    const selectorStyleU={
        left : `50%`,
        transform : `translateX(${selectorOffsetU}%)`
    }

    

    const handleShuttleU=(btnPosition)=>{
        const offset = btnPosition === 2 ? 5 : -103
        setSelectorOffsetU(offset)
        setSelectedBtnU(btnPosition)
    }

    const handleShuttle=(btnPosition)=>{
        let offset = 0
        switch(btnPosition) {
            case 1:
                offset = 0.5;
                break;
            case 2:
                offset = 50;
                break;
            case 3:
                offset = 99.5;
                break;
        }
        setSelectorOffset(offset)
        setSelectedBtn(btnPosition)
       
    }
    const userStyle={
        justifyContent: 'center',
    }

    const mediatorVersion =(
                <div className="ss" style={style}>        
                    <button id="ss--pa" style={{color : selectedBtn === 2 ?"white": "black"}}className="ss--btn"  onClick={()=>handleShuttle(1)}>
                        <p  className="ss--btn-content">Party A</p> </button>
                    <button style={{color : selectedBtn === 2 ?"white": "black"}} className="ss--btn"  onClick={()=>handleShuttle(2)}>
                        <p className="ss--btn-content">Main</p></button>
                    <button style={{color : selectedBtn === 2 ?"white": "black"}} className="ss--btn"  onClick={()=>handleShuttle(3)}>
                        <p id="ss--pb" className="ss--btn-content">Party B</p> </button>
                    <div className="ss-selector" style={selectorStyle}></div>
                </div>)

    const userVersion=(   
                <div className="ss" style={userStyle}>
                    <button id="ss--pa" style={{color : selectedBtnU === 1 ?"white": "black"}} className="ss--btn ss--btn-uv"  onClick={()=>handleShuttleU(1)}>
                        <p  className="ss--btn-content">Me & Mediator</p> </button>
                        <div className="ss--spacer" />
                    <button
                         style={{
                            color: selectedBtnU === 2 ? "white" : "black",
                         }}
                         className="ss--btn"
                         onClick={()=>handleShuttleU(2)
                         }>
                        <p id="ss--pb" className="ss--btn-content">Main</p> </button>
                    
                    <div className="ss-selector" style={selectorStyleU}></div>
                </div>)


    return(
        <div >
            {isMediator? mediatorVersion : userVersion}
        </div>

        )
}
export default ShuttleSwitch

