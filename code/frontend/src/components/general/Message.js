import "../../styles/components/message.css"
import { useSelector } from "react-redux"
import { getPermName } from "../../utils/permissions"
const Message=({text,sender,isSelf, time, name})=>{
    const {role:roleNumber} = useSelector(state=>state.user)
    const role = getPermName({role:roleNumber})

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
        //Check direction for hebrew
        const firstChar = text.charCodeAt(0);
        //א == 1488 , ת == 1514
        const textDir = firstChar >= 1488 && firstChar <= 1514 ? "right": "left ";
       

    return(

        <div className={`message ${isSelf ? "" : "message-right"}`} >

            <div className="message-content" style={messageStyle}>
                <div className="message-header">
                    <h6 className="message--text" id="message--title">{name}</h6>
                    <h6 className="message--time">{time}</h6>   
                </div>

                <div className="message-container" >
                    <p className="message--text"
                        dir="auto"
                        style={{textAlign:textDir}}>
                        {text}
                    </p>
                </div>
            </div>

        </div>

        
        )
}
export default Message