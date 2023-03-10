import "../../styles/button.css"
import {react} from 'react'

const  Button=({text , size})=>{

    const style = {
        minWidth: size === "small" ? "10em" : "15em" ,
    }


    return(
        <div>
            <button className="btn" style={style}>
                <span>
                    {text}    
                </span>
            </button>
        </div>

)}
export default Button