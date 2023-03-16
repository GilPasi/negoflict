import "../../styles/text_field.css"
import {React, useState} from 'react'
import InfoBox from "./infoBox"

const  TextHolder=({caseData})=>{
    const title = caseData.title
    const [info,setInfo] = useState(false)
    const sign = ['>','<']

    const handleClick = ()=>{
        if(info)
            setInfo(false)
        else
            setInfo(true)

    }
    

    return(
        <div className="box-holder">
            <div className="box-holder-pos">
                <div className="text-field-box">
                    <div className="text-field-box-title">
                        <p >{title}</p>
                    </div>

                    <div className="text-field-box-info">
                        <button onClick={handleClick} className="text-field-box-info-button"> {
                            info?sign[1]:sign[0]
                        }
                         </button>
                    </div>
                </div>


            </div>
            <div className="info">
            {info&&caseData.title
            ?
            (<InfoBox obj={caseData}/>)
            :(<div></div>)
           
            }
            </div>


        </div>
               
                
            
         
            
        

    )}
export default TextHolder