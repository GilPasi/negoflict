import "../../styles/components/button.css"

const  Button=(props)=>{
    const {text,size, margin,type,onClick,color,length,altitude} = props
    let _width , _height = 0 

    //Pre-made sizes
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

    const style = {
        width:size?_width : length,
        height:size? _height :altitude,
        margin: margin ? margin : "1.5em",
        type: type ? type : "",
        backgroundColor: color? color:''

    }

    return(
        <button 
            className="btn"
            style={style}
            onClick={onClick}
            >
            {text ? text : "Next"} 
            {/* Next button is the most common button on the app */}
        </button>
)}
export default Button