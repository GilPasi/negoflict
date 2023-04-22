import "../../styles/components/dropdown_selector.css"
import {useState} from "react"

const DropdownSelector = ({options,placHolder,parentRef,
                            name,value,onChange,
                            className,height,
                            width,margin,valType}) =>{

        const valueIndex = valType ?? 'value'
        
        const optionElements = options.map(option=><option key={option.id}>{option[valueIndex]}</option>)
    
    //======================== Rotating arrow (currently disabled) ===========================
        const [isActive , setIsActive] = useState(false) //Determine if the arrow is up or down


        //Listen to all the clicks on the screen to determine the arrow's side
    document.querySelector(".app").addEventListener("click",
        function(event){
            if(event.target.id!=="dd--select") /*A click anywhere on the screen except the dropdown menu
                                                 will cause the arrow to flip downwards*/
                setIsActive(false); //Avoid double renedering bug
                
            
    });

        
    const buttonRot ={transform:isActive ? "rotate(225deg)" : "rotate(45deg)"}

    const handleClick = (event)=>{
        setIsActive(true)//Avoid double renedering bug
    }

    //====================================================================


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
                    //Rotating arrow in temporarily disabled due to a bug
                    // onClick={handleClick}
                    ref={parentRef}
                    onChange={onChange}
                >
                    <option id='dd--option'>{placHolder}</option>
                    {optionElements}
                </select>
            </section>
        )
}

export default DropdownSelector