import "../../styles/components/dropdown.css"
import {useState , useEffect} from 'react'
const Dropdown = ({style , options , placeholder , dropdownId})=>{

    useEffect(()=>{
        const page = document.querySelector("body")
        page.addEventListener("click" , handleClick)

        return(()=>page.removeEventListener("click" , handleClick))

    },[])

    const [showOptions , setShowOptions] = useState(false) 

    const handleClick =e=>{
        console.log("AAA")

        const element = document.getElementById("dropdown" + dropdownId);
        const bounds = element.getBoundingClientRect();
        const lowBound = showOptions ? bounds.bottom * (options.length) : bounds.bottom;

        if(
            e.clientX < bounds.left
            ||e.clientX > bounds.right
            ||e.clientY < bounds.top
            ||e.clientY > lowBound
        )
        setShowOptions(false)
        else
        setShowOptions(true)

        const width = bounds.width;
        const height = bounds.height;

    }

    const optionStyle={
        position:'absolute',
        backgroundColor:"whitesmoke" ,
        shadowBox:"inherit",
        width:"100%" , 
        height:"100%",
        left:"0",
        zIndex:"10",
        boxSizing:"inherit" , 
        padding:"1em",
        borderBottom:"1px solid #80808086",
        cursor:"pointer" ,
    }


    const optionsElement=options.map((option, index)=>{return(
        <label
            name={option}
            style={{
            ...optionStyle,
            top:`calc(${index + 1}*100%)` ,
            }}
                
        >

        <input type="checkbox" className="dropdown--checkbox"/>
            <span>{index}{option}</span>
            
        </label>
    )})
    return(

    <section 
        className="dropdown"
        style={style}
        id={"dropdown" + dropdownId}
     >
        

        {placeholder?placeholder:"Choose"}
        {showOptions && optionsElement}
   
    </section>
    )
}
export default Dropdown;