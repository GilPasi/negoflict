import "../../styles/components/message.css"
import { useSelector } from "react-redux"
const Message=({text,sender,isSelf, time, name})=>{
    const {role} = useSelector(state=>state.user)

    const getColor = ()=>{
        if(isSelf)return "#BFE8FB" //my message always blue
        if(sender==='M')return "#89E0A2" // mediator message not my always green
        if(sender!=='M' && role==='user')return "#F4D1BD" //other side when Im user always red
        if(role==='mediator' && sender==='A')return "#89E0A2"
        return "#F4D1BD"
        

    }

        const messageStyle ={
            backgroundColor : getColor(),
        }

    return(

        <div className={`message ${isSelf ? "" : "message-right"}`} >

            <div className="message-content" style={messageStyle}>
            <div className="message-header">
                <h6 className="message--text" id="message--title">{name}</h6>
                <h6 className="message--time">{time}</h6>
               
                </div>
                <div className="message-continer">
                <p className="message--text" dir="auto" >{text}</p>
                </div>
            </div>

        </div>
        
        )
}
export default Message