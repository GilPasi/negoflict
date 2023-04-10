import "../../styles/components/button.css"

const  Button=({text , size, margin,type,onClick,color,length, disabled,altitude})=>{
    let _width, _height

    switch(size){
        case "small":
            _width = "6em"
            _height = "2.5em"
        break
        case "medium":
            _width = "9em"
            _height = "2.5em"
            break;
        case "large":
            _width = "12em"
            _height = "3em"
            break;
    }

    const style =disabled?{
        width:length,
        minWidth: size === "small" ? "8em" : "10em" ,
        height: size==="small" ? "2em" : "3em",
        margin: margin ? margin : "1.5em",
        type: type ? type : "",
    }:{
        width:size?_width : length,
        height:size? _height :altitude,
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
            {text ? text : "Next"} 
            {/* Next button is the most common button on the app */}
        </button>
)}
export default Button