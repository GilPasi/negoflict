import {React} from 'react'
import { useState } from 'react'

const  TextField=({type,placeHolder, onChange,name})=>{
    

    return(
        <div className="text-field">
            <input name={name}  onChange={onChange} className="text-field-input" type={type} placeholder={placeHolder} 
            align="left"></input>
        </div>

    )}
export default TextField