import '../../styles/components/text_holder.css'
import {React, useState} from 'react'
import InfoBox from "./InfoBox"

const  TextHolder=({caseData})=>{
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

                <div className="th--box">
                    <p>{title}</p>

                    <div className="th--switch">
                        <button
                         onClick={handleClick}
                          className="th--switch-arrow"> 
                          {info?'<':'>'}
                         </button>
                    </div>
                </div>


            <div className="th--info">
                <InfoBox obj={caseData} size={infoSize}/>
            </div>

        </section>
    )}
export default TextHolder