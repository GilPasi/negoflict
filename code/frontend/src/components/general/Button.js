import "../../styles/components/button.css"

const Button=({text , size, margin,type,onClick,color,length, disabled,altitude,
                disableSubmit, fontSize})=>{
    let _width, _height

    switch(size){
        case 'x-small':
            _width = 'fit-content'
            _height = "1.5em"
            break
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
        default:
            break;
    }

    const style ={
        width: size?_width : length,
        height:size? _height :altitude,
        margin: margin ? margin : "1.5em",
        type: type ? type : "",
        backgroundColor: color? color:'',
        fontSize: fontSize?fontSize:''
        
    }




    return(
        <button 
            type = {disableSubmit&&"button"}
            className={disabled?'btn-disable':"btn-active"}
            style={style}
            onClick={onClick}
            disabled={disabled}
            >
            {text ? text : "Next"} 
            {/* Next button is the most common button on the app */}
        </button>
)}
export default Button