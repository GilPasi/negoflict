import '../../styles/components/text_holder.css'
import {React, useState} from 'react'
import InfoBox from "./infoBox_"

const  TextHolder=({caseData, withInfo})=>{
    const title = caseData.title
    const [info,setInfo] = useState(false)

    const handleClick = ()=>{
        if(info)
            setInfo(false)
        else
            setInfo(true)

    }
    let renderInfo = info&&caseData.title 

    const infoSize = {
        transform : `scale(${renderInfo? '1' : '0'})`,
        position: renderInfo ? "static" : "absolute",
        margin: renderInfo ? "2.5em" : "0em",

    }
    

    return(
        <section className="th">

                <div className="th--box" style={{marginTop:'0'}}>
                    <p>{title}</p>
                    {withInfo&&

                    <div className="th--switch">
                        <button
                         onClick={handleClick}
                          className="th--switch-arrow"> 
                          {info?'<':'>'}
                         </button>
                    </div>}
                </div>

            {withInfo&&     
            <div className="th--info">
                <InfoBox 
                obj={caseData} 
                size={infoSize}
                />
            </div>
            }

        </section>
    )}
export default TextHolder