import '../../styles/components/popupGeneral.css'
import ExitIcon from './icons/ExitIcon'
import Button from "./Button"

import {useState} from 'react'

const PopUpGeneral = ({children, onClose})=>{
    const [data , setData] = useState(JSON.parse(JSON.stringify(children)));
    
    // const [a ,setA ] = useState ()

    let objKey = Object.keys(children)

    const handleSave = ()=>{
        //Hen : complete save 
    }

    const handleChange =event=>{
        const {name, value} = event.target
        setData(prevData=>({    
                ...prevData ,
                [name]: value
            }))
    }


    return(
        <div className='popup-general--container'>
            <span className='popup-general--title'>{`${data.user.first_name} ${data.user.last_name}`}</span>
            <ExitIcon onClose={onClose}/>
         
        <div className='popup-general--box centerizer'>

            <ul className='popup-general--list-prop'>
                {
                    <li className="popup-general--field"> 
                        <span className='popup-general--key-pop'>Email</span>
                        <span className='popup-general--value-pop' id="popup-general--email">{data.user.email}</span>
                    </li>
                }
                
                {objKey.map((key,index)=>{

                    if(key==='user' || key=="certification_course")return
                    let _value = data[key]

                    let formattedKey = key.replace("_" , " ")
                    formattedKey = formattedKey[0].toUpperCase() + formattedKey.slice(1)
                    
                    
                    return(
                    <li key={index} className="popup-general--field" >
                        <span className='popup-general--key-pop' >{formattedKey}</span>
                        <input
                            name={key} 
                            className='popup-general--value-pop'
                            value={_value}
                            onChange={e=>handleChange(e)}
                        />
                    </li>
                )})}


                <li className="popup-general--field"> 
                    <span className='popup-general--key-pop'>Certification course</span>
                    <label className="popup-general--radio">
                    <input 
                        name="hasCert" 
                        type="radio"  
                        className="popup-general--radio-in"
                        checked={data.cetification_course}
                        onChange={handleChange}

                    />
                        ✔
                    </label>

                    <label className="popup-general--radio">
                        <input 
                        name="hasCert" 
                        type="radio" 
                        checked={data.cetification_course}
                        className="popup-general--radio-in"
                        onChange={handleChange}
                    />
                        ✘
                    </label>

                </li>
            </ul>
            <Button text="save" length="6em" altitude="2em" onClick={handleSave}/>
        </div>
        </div>

    )
    



}
export default PopUpGeneral