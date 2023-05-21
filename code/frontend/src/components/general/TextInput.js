import "../../styles/components/text_field.css"
import {useState} from 'react'
const  TextField=({type,placeHolder,
                onChange,name,length,
                altitude,align,parentRef,
                value, required,isValid,
                warnText,inGrid,id
            })=>{
    const [userReacted , setUserReacted ] = useState(false)
    
    let classPostfix = align === "left" ? "-la" : "" //la for left alignment
    const _valid = isValid===false? false : true
    const _warnText = warnText ? warnText : "Invalid " + name 
    
    const inputStyle = {
        width: length? length : "12em",
        height: altitude? altitude : "1em",
        margin: length === "100%" ? "0" : "1em",
        boxSizing:inGrid?"border-box" : "content-box",
    }
    /*This designated for a specific case 
    where we might want the field to 
    take over a cell and need 100% width to
    In this case margin may cause overflow*/

    const labelStyle ={
        transform:inGrid? "translateY(-100%)" : "",
        left:inGrid ? "0" : "7%",

    }

    const handleChange =(e)=>{
        setUserReacted(true)
        onChange(e)
    }
   

    return(
        <div >
        <section   className="text-input">
            
            {!(userReacted)&&!(_valid)&&
            <label 
                htmlFor={name}
                className="text-input--lbl"
                style={labelStyle}
            >
                {_warnText}
            </label>}
            <div id={id || ''}></div>
            <input 
                ref={parentRef}
                name={name}
                onChange={e=>handleChange(e)} 
                className={`text-input--in${classPostfix}`}
                type={type} 
                placeholder={placeHolder} 
                align="left"
                style={inputStyle}
                value={value}
                required={required}
                id={name}
        
            />
        </section>
        </div>

    )}
export default TextField