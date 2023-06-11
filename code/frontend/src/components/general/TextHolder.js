import '../../styles/components/text_holder.css'
import {React, useState} from 'react'
import InfoBox from "./InfoBox"
import ExitIcon from "./icons/ExitIcon"
import useAlert from "../../hooks/useAlert"
import SmallPlus from './icons/SmallPlus'
import { useSelector } from 'react-redux'
import { useCreateContactMutation, useRemoveContactMutation } from '../../store'





const  TextHolder=({caseData, withInfo, hasExit,addOns,pressDetail,plus, contactId, infoInsted, handleSelect})=>{
    const title = caseData.title
    const [info,setInfo] = useState(false)
    const {deletAlert,trigerNotification} = useAlert()
    const {id} = useSelector(state=>state.user)
    const [addContact] = useCreateContactMutation()
    const [removeContact] = useRemoveContactMutation()
 


    const handleClick = ()=>{
        if(info)
            setInfo(false)
        else
            setInfo(true)
    }

    const handleDelete =async ()=>{

        const isDismissed =await deletAlert({
            title:pressDetail?.title ?? '',
            confirmText:pressDetail?.confirm ?? '',
            // background:'#fffcfcb4',
           })
           console.log(isDismissed)
           if(isDismissed)return

           
           removeContact({contact:contactId})
           .then(res=>trigerNotification('User Deleted successfully', 'success'))
           .catch(()=>trigerNotification('Error!. Please try again.', 'error'))
           

    }
    const handleAddContact = ()=>{
        console.log(id)
        console.log(caseData)
        addContact({mediator_id:id,user_id:caseData.user})
        .then(res=>trigerNotification('User Added to your contacts successfully', 'success'))
        .catch(()=>trigerNotification('Error! The user has not been added to your contacts. Please try again.', 'error'))
      
    }
    

    let renderInfo = info&&caseData.title 
    return(
        <section className="th">
            <div className="th--box" >
                <p className='th--title' style={{overflow:'hidden',  textOverflow: 'ellipsis',whiteSpace:'nowrap' }}>{title}</p>
                {addOns&& <p style={{marginLeft:'8px',textAlign:'center',width:'87%',color:'black', position:'absolute',bottom:'-16%',fontSize:'small',left:'50%',transform:'translate(-50%)',overflow:'hidden',textOverflow: 'ellipsis',whiteSpace:'nowrap'}}>{addOns}</p>}
                <div style={{position:'absolute',right:'2%',top:'28%'}}>
                    {plus&&!infoInsted&&<SmallPlus onClick={handleAddContact}/>}
                    {infoInsted&&
                    <button onClick={()=>handleSelect(caseData.user)}  className='info-button-small'>
                    <div className='circule-info-button-small'>
                        <div className='circule-info-button-small-i-up'></div>
                        <div className='circule-info-button-small-i-down'></div>
                    </div>
                    </button>}
                </div>
            
                   
               
             
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