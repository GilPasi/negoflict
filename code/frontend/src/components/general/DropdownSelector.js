import "../../styles/components/dropdown_selector.css"
import {useState} from "react"

const DropdownSelector = ({options,placHolder,parentRef,
                            name,value,onChange,
                            className,height,
                            width,margin,valType}) =>{

        const valueIndex = valType ?? 'value'
        
        const optionElements = options.map(option=><option key={option.id}>{option[valueIndex]}</option>)
        const [isActive , setIsActive] = useState(false) 

        console.log(optionElements)


        //Listen to all the clicks on the screen to determine the arrow's side
    document.querySelector("#root").addEventListener("click",
        function(event){
            if(event.target.id!=="dd--select")
                setIsActive(false); 
    });
        
    const buttonRot ={
        transform:isActive ? "rotate(225deg)" : "rotate(45deg)"
    }

    const handleClick = ()=>{
        setIsActive(prevState=>!prevState)
    }

    const style={
        width : width,
        margin:margin? margin : "0",
        height : height,

    }

        return(
    
            <section
             className={`dd ${className}`}
              onChange={onChange}
              style={style}
              onClick={()=>document.querySelector("#dd--select").click()}

              >
                <div className="dd--arrow" style={buttonRot}></div>
                <select
                    id="dd--select"
                    name={name}
                    defaultValue={value}
                    value={options.value}
                    onClick={handleClick}
                    ref={parentRef}
                >
                    <option>{placHolder}</option>
                    {optionElements}
                </select>
            </section>
        )
}

export default DropdownSelector