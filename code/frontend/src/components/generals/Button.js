import "../../styles/button.css"
import {react} from 'react'

const  Button=(props)=>{
    const {text , size} = props
    return(
        <div>
            <button className={`btn-${size} btn`}>
                <span>
                    {text}    
                </span>
            </button>
        </div>

)}
export default Button