import "../../styles/components/text_field.css"
import {useState} from 'react'
const  TextField=({type,placeHolder,
                onChange,name,length,
                altitude,align,parentRef,
                value, required,isValid,
                warnText
            })=>{
    
    const [userReacted , setUserReacted ] = useState(false)

    let classPostfix = align === "left" ? "-la" : "" //la for left alignment
    const _valid = isValid===undefined ? true : isValid
    const _warnText = warnText ? warnText : "Invalid " + name 

    const widthStyle = {
        width: length? length : "12em",
        height: altitude? altitude : "1em",
        margin: length === "100%" ? "0" : "1em",
    }
    /*This designated for a specific case 
    where we might want the field to 
    take over a cell and need 100% width to
    In this case margin may cause overflow*/

    const handleChange =(e)=>{
        setUserReacted(true)
        onChange(e)
    }
   

    return(
        <div className="input-box">
            {!userReacted&&!isValid&&<label htmlFor={name} className="text-input--lbl">{_warnText}</label>}
            <input 
                ref={parentRef}
                name={name}
                onChange={e=>handleChange(e)} 
                className={`text-field-input${classPostfix}`}
                type={type} 
                placeholder={placeHolder} 
                align="left"
                style={widthStyle}
                value={value}
                required={required}
                id={name}
        
            />
        </div>

    )}
export default TextField