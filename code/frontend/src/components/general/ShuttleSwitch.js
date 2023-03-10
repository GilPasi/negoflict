import {useState} from 'react'
import "../../styles/shuttle_switch.css"
const ToolBar =({conflictName , id})=>{

    const[selectorOffset , setSelectorOffset] = useState(50)
    const[selectedBtn , setSelectedBtn] = useState(2)
    
    const whiteStyle={color : "white"}
    const blackStyle={color : "black"}

    const selectorStyle={
        left : `${selectorOffset}%`,
        transform : `translateX(-${selectorOffset}%)`
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


        //Backend part for Hen

    }

    return(
        <div className="ss">
            
            <button id="ss--pa" style={selectedBtn === 1 ?whiteStyle: blackStyle } className="ss--btn"  onClick={()=>handleShuttle(1)}>
                <p  className="ss--btn-content">Party A</p> </button>
            <button style={selectedBtn === 2 ?whiteStyle: blackStyle } className="ss--btn"  onClick={()=>handleShuttle(2)}>
                <p className="ss--btn-content">Main</p></button>
            <button style={selectedBtn === 3 ?whiteStyle: blackStyle } className="ss--btn"  onClick={()=>handleShuttle(3)}>
                <p id="ss--pb" className="ss--btn-content">Party B</p> </button>
            
            <div className="ss-selector" style={selectorStyle}></div>
        </div>

        )
}
export default ToolBar

