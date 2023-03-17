import "../../styles/dropdown_selector.css"
import {useState} from "react"

const DropdownSelector = ({options , placHolder,name,value,onChange}) =>{

    const optionElements = options.map(option=><option value={option}>{option}</option>)
    const [isActive , setIsActive] = useState(false) 

    const buttonRot ={
        transform:isActive ? "rotate(225deg)" : "rotate(45deg)"
    }

    const handleClick = ()=>{
        //Update UI
        setIsActive(prevState=>!prevState)

        //Update form
        onChange()

    }

        return(
    
            <section className="dd" onChange={onChange}>
                <div className="dd--arrow" style={buttonRot}></div>
                <select onClick={handleClick}>
                    <option value="" disabled selected>{placHolder}</option>
                    {optionElements}
                </select>
            </section>
        )
}

export default DropdownSelector