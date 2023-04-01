import "../../styles/components/message.css"
const Message=({text,sender,isSelf, time, name})=>{
    let messageColor = ""

    switch(sender){
        case 1:
            messageColor = "#BFE8FB"
            break;
        case 2:
            messageColor = "#89E0A2"
            break;
        case 3:
            messageColor = "#F4D1BD"
            break;
        }

        const messageStyle ={
            backgroundColor : messageColor,
        }

    return(

        <div className={`message ${isSelf ? "" : "message-right"}`} >

            <div className="message-content" style={messageStyle}>
            <div className="message-header">
                <h6 className="message--text" id="message--title">{name}</h6>
                <h6 className="message--time">{time}</h6>
               
                </div>
                <div className="message-continer">
                <p className="message--text">{text}</p>
                </div>
            </div>

        </div>
        
        )
}
export default Message