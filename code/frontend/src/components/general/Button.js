import "../../styles/components/button.css"

const  Button=({text , size, margin,type,onClick,color})=>{

    const style = {
        minWidth: size === "small" ? "8em" : "10em" ,
        height: size==="small" ? "2em" : "3em",
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