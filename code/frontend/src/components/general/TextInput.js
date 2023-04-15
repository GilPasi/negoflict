import "../../styles/components/text_field.css"
import {React} from 'react'
const  TextField=({type,placeHolder,
                onChange,name,length,
                altitude,align,parentRef,value, required})=>{
    
    let classPostfix = align === "left" ? "-la" : "" //la for left alignment
    
    const widthStyle = {
        width: length? length : "12em",
        height: altitude? altitude : "1em",
        margin: length === "100%" ? "0" : "1em",
    }
    /*This designated for a specific case 
    where we might want the field to 
    take over a cell and need 100% width to
    In this case margin may cause overflow*/
    const handleWheel = (event) => {
        event.preventDefault();
      };

    return(
            <input 
                ref={parentRef}
                name={name}
                onChange={onChange} 
                className={`text-field-input${classPostfix}`}
                type={type} 
                placeholder={placeHolder} 
                align="left"
                style={widthStyle}
                value={value}
                required={required}
                onWheel={type==='number'? handleWheel: null}
                
            
            />

    )}
export default TextField