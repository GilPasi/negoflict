import '../../styles/components/text_holder.css'
import {React, useState} from 'react'
import InfoBox from "./InfoBox"
import ExitIcon from "./ExitIcon"
import useAlert from "../../hooks/useAlert"




const  TextHolder=({caseData, withInfo, hasExit})=>{
    const title = caseData.title
    const [info,setInfo] = useState(false)
    const {deletAlert} = useAlert()


    const handleClick = ()=>{
        if(info)
            setInfo(false)
        else
            setInfo(true)

    }

    const handleDelete =async ()=>{

        const isDismissed =await deletAlert({
            title:"Deleting a case will also discard all of its records, are you sure?",
            confirmText:'Yes, delete this case',
            background:'#fffcfcb4',
           })
           if(isDismissed)return
           

           //Hen: delete chat

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
            <div className="centerizer">
                {hasExit&&<ExitIcon onClose={handleDelete} style={{top:"50%" , transform: "translateY(-50%)"}} />}
            </div>

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