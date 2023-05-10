import '../../styles/components/text_holder.css'
import {React, useState} from 'react'
import InfoBox from "./InfoBox"
import ExitIcon from "./ExitIcon"



const  TextHolder=({caseData, withInfo, hasExit})=>{
    const title = caseData.title
    const [info,setInfo] = useState(false)

    const handleClick = ()=>{
        if(info)
            setInfo(false)
        else
            setInfo(true)

    }
    let renderInfo = info&&caseData.title 


    return(
        <section className="th">
            <div className="th--box" >
                <p className='th--title'>{title}</p>
                {withInfo&&

                <div className="th--switch">
                    <button
                        onClick={handleClick}
                        className="th--switch-arrow"> 
                        {info?'<':'>'}
                        </button>
                </div>}
            </div>
            {hasExit&&<ExitIcon />}

        {withInfo&&<div className="th--info">
            <InfoBox 
            obj={caseData} 
            isOpen={renderInfo}
            hasExit={hasExit}
            />
        </div>}
    </section>
    )}
export default TextHolder