import "../../styles/button.css"
import {react} from 'react'

const  Button=({text , size, margin,type,onClick,color})=>{

    const style = {
        minWidth: size === "small" ? "10em" : "15em" ,
        margin: margin ? margin : "1.5em",
        type: type ? type : "",
        backgroundColor: color? color:''

    }




    return(
        <div>
            <button 
            className="btn"
             style={style}
             onClick={onClick}
             >
                <span>
                    {text}    
                </span>
            </button>
        </div>

)}
export default Button