import "../../styles/shuttle_switch.css"
import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { updatePosition } from '../../store'

const ShuttleSwitch =({isMediator})=>{

    const[selectorOffset , setSelectorOffset] = useState(50)
    const[selectedBtn , setSelectedBtn] = useState(2)
    const[selectorOffsetU , setSelectorOffsetU] = useState(10)
    const[selectedBtnU , setSelectedBtnU] = useState(1)


    const dispatch = useDispatch()
    
    const whiteStyle={color : "white"}
    const blackStyle={color : "black"}

    const selectorStyle={
        left : `${selectorOffset}%`,
        transform : `translateX(-${selectorOffset}%)`
    }
    dispatch(updatePosition(selectedBtn))

    const selectorStyleU={
        left : `50%`,
        transform : `translateX(${selectorOffsetU}%)`
    }

    const handleShuttleU=(btnPosition)=>{
        let offset = btnPosition === 2 ? 10 : -90
        setSelectorOffsetU(offset)
        setSelectedBtnU(btnPosition)
    }

    const handleShuttle=(btnPosition)=>{
        let offset = 0
        switch(btnPosition) {
            case 1:
                offset = 0;
                break;
            case 2:
                offset = 50;
                break;
            case 3:
                offset = 100;
                break;
        }
        setSelectorOffset(offset)
        setSelectedBtn(btnPosition)



    }
    const userStyle={
        justifyContent: 'center',
    }

    const mediatorVersion =(
                <div className="ss">        
                    <button id="ss--pa" style={selectedBtn === 1 ?whiteStyle: blackStyle } className="ss--btn"  onClick={()=>handleShuttle(1)}>
                        <p  className="ss--btn-content">Party A</p> </button>
                    <button style={selectedBtn === 2 ?whiteStyle: blackStyle } className="ss--btn"  onClick={()=>handleShuttle(2)}>
                        <p className="ss--btn-content">Main</p></button>
                    <button style={selectedBtn === 3 ?whiteStyle: blackStyle } className="ss--btn"  onClick={()=>handleShuttle(3)}>
                        <p id="ss--pb" className="ss--btn-content">Party B</p> </button>
                    <div className="ss-selector" style={selectorStyle}></div>
                </div>)

    const userVersion=(   
                <div className="ss" style={userStyle}>
                    <button id="ss--pa" style={selectedBtnU === 1 ?whiteStyle: blackStyle } className="ss--btn ss--btn-uv"  onClick={()=>handleShuttleU(1)}>
                        <p  className="ss--btn-content">Me & Mediator</p> </button>
                        <div className="ss--spacer"></div>
                    <button style={selectedBtnU === 2 ?whiteStyle: blackStyle } className="ss--btn"  onClick={()=>handleShuttleU(2)}>
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

