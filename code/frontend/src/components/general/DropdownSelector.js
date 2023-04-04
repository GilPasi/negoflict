import "../../styles/components/dropdown_selector.css"
import {useState} from "react"

const DropdownSelector = ({options , placHolder,
    name,value,onChange,className,height,width,margin}) =>{

    const optionElements = options.map(option=><option key={option.id}>{option.value}</option>)
    const [isActive , setIsActive] = useState(false) 

    const buttonRot ={
        transform:isActive ? "rotate(225deg)" : "rotate(45deg)"
    }

    const handleClick = ()=>{
        setIsActive(prevState=>!prevState)
    }

    const style={
        width : {width},
        margin:margin? margin : "0",
        height : {height},

    }

        return(
    
            <section
             className={`dd ${className}`}
              onChange={onChange}
              style={style}

              >
                <div className="dd--arrow" style={buttonRot}></div>
                <select
                    name={name}
                    defaultValue={value}
                    value={options.value}
                    onClick={handleClick}
                >
                    <option>{placHolder}</option>
                    {optionElements}
                </select>
            </section>
        )
}

export default DropdownSelector