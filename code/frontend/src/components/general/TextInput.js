import "../../styles/text_field.css"
import {React} from 'react'
const  TextField=({type,placeHolder, onChange,name,value})=>{
    

    return(
        <div className="text-field">
            <input
             name={name}
             value={value}
            onChange={onChange} 
            className="text-field-input" 
            type={type} 
            placeholder={placeHolder} 
            align="left"
            
            ></input>
        </div>

    )}
export default TextField