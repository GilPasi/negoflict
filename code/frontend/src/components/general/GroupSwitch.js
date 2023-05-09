
import {useEffect, useState} from 'react'
import "../../styles/components/group_switch.css"
import { useDispatch } from 'react-redux'
import { updatePosition } from '../../store'

const GroupSwitch =({isMediator})=>{

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
    const userStyle={
        justifyContent: 'center',
    }

    const mediatorVersion =(
                <div className="gs" style={style}>        
                    <button id="gs--pa" style={{color : selectedBtn === 1 ?"white": "black"}}className="gs--btn"  onClick={()=>handleGroupSwap(1)}>
                        <p  className="gs--btn-content">Party A</p> </button>
                    <button style={{color : selectedBtn === 2 ?"white": "black"}} className="gs--btn"  onClick={()=>handleGroupSwap(2)}>
                        <p className="gs--btn-content">Main</p></button>
                    <button style={{color : selectedBtn === 3 ?"white": "black"}} className="gs--btn"  onClick={()=>handleGroupSwap(3)}>
                        <p id="gs--pb" className="gs--btn-content">Party B</p> </button>
                    <div className="gs-selector" style={selectorStyle}></div>
                </div>)

    const userVersion=(   
                <div className="gs" style={userStyle}>
                    <button id="gs--pa" style={{color : selectedBtnU === 1 ?"white": "black"}} className="gs--btn gs--btn-uv"  onClick={()=>handleGroupSwapU(1)}>
                        <p  className="gs--btn-content">Me & Mediator</p> </button>
                        <div className="gs--spacer" />
                    <button
                         style={{
                            color: selectedBtnU === 2 ? "white" : "black",
                         }}
                         className="gs--btn"
                         onClick={()=>handleGroupSwapU(2)
                         }>
                        <p id="gs--pb" className="gs--btn-content">Main</p> </button>
                    
                    <div className="gs-selector" style={selectorStyleU}></div>
                </div>)


    return(
        <div >
            {isMediator? mediatorVersion : userVersion}
        </div>

        )
}
export default GroupSwitch

