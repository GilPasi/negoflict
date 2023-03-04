import {react} from 'react'

const  Button=(props)=>{
    const {text , size} = props
    return(
        <div>
            <button className={`button-${size} button`}>
                <span>
                    {text}    
                </span>
            </button>
        </div>

)}
export default Button