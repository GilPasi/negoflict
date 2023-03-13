import "../../styles/dropdown_selector.css"
import {useState} from "react"

const DropdownSelector = ({options , placHolder}) =>{

    const optionElements = options.map(option=><option value="">{option}</option>)
    const [isActive , setIsActive] = useState(false) 

    const buttonRot ={
        transform:isActive ? "rotate(225deg)" : "rotate(45deg)"
    }

    const handleClick = ()=>{setIsActive(prevState=>!prevState)}

        return(
    
            <section className="dd">
                <div className="dd--arrow" style={buttonRot}></div>
                <select onClick={handleClick}>
                    <option value="" disabled selected>{placHolder}</option>
                    {optionElements}
                </select>
            </section>
        )
}

export default DropdownSelector