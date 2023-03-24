import "../../styles/components/message.css"
const Message=({text,sender,isSelf, time, name})=>{
    let messageColor = ""
  console.log('in message')
  console.log(name)

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

        <div className="message" style={{justifyContent:isSelf ?"left" :"right"}}>

            <div className="message-content" style={messageStyle}>
            <div className="message-header">
                <h6 className="message--text" id="message--title">{name}</h6>
                <h7 className="message--time">{time}</h7>
               
                </div>
                <p className="message--text">{text}</p>
            </div>

        </div>
        
        )
}
export default Message