import "../../styles/text_field.css"
import {React} from 'react'
const  TextField=({type,placeHolder,onChange,name,value})=>{
    
    let classPostfix = align === "left" ? "-la" : "" 
    
    const widthStyle = {
        width: length? length : "15.5em",
        height: altitude? altitude : "2.5em",
        margin: length === "100%" ? "0" : "1em"
    }
    /*This designated for a specific case 
    where we might want the field to 
    take over a cell and need 100% width to
    In this case margin may cause overflow*/


    return(
        <section>
            <input
             name={name}
             value={value}
            onChange={onChange} 
            className={`text-field-input${classPostfix}`}
            type={type} 
            placeholder={placeHolder} 
            align="left"
            style={widthStyle}
            
            />
        </section>

    )}
export default TextField