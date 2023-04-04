import "../../styles/components/text_field.css"
import {React} from 'react'
const  TextField=({type,placeHolder,onChange,
    name, length,altitude,align})=>{
    
    let classPostfix = align === "left" ? "-la" : "" 
    
    const widthStyle = {
        width: length? length : "12em",
        height: altitude? altitude : "1em",
        margin: length === "100%" ? "0" : "1em",
    }
    /*This designated for a specific case 
    where we might want the field to 
    take over a cell and need 100% width to
    In this case margin may cause overflow*/
    

    return(
            <input
                name={name}
                // value={value}
                onChange={onChange} 
                className={`text-field-input${classPostfix}`}
                type={type} 
                placeholder={placeHolder} 
                align="left"
                style={widthStyle}
            
            />

    )}
export default TextField