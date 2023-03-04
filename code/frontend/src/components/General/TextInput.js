import {React} from 'react'

const  TextField=(props)=>{
    console.log(props.placeHolder)

    
    return(
        <div className="text-field">
            <input className="text-field-input" type={props.type} placeholder={props.placeHolder} 
            align="left"></input>
        </div>

    )}
export default TextField