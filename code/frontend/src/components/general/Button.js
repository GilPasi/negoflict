import "../../styles/components/button.css"

const  Button=({text , size, margin,type,onClick,color,length, disabled})=>{

    const style =disabled?{
        width:length,
        minWidth: size === "small" ? "8em" : "10em" ,
        height: size==="small" ? "2em" : "3em",
        margin: margin ? margin : "1.5em",
        type: type ? type : "",
    }:{
        width:length,
        minWidth: size === "small" ? "8em" : "10em" ,
        height: size==="small" ? "2em" : "3em",
        margin: margin ? margin : "1.5em",
        type: type ? type : "",
        backgroundColor: color? color:''
    }

    return(
        <button 
            className={disabled?'btn-disable':"btn"}
            style={style}
            onClick={onClick}
            disabled={disabled}
            >
            {text}    
        </button>
)}
export default Button