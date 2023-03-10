const Message=({text,sender,isSelf})=>{
    let messageColor = ""
    let title =""

    switch(sender){
        case 1:
            messageColor = "#BFE8FB"
            title = "Party A"
            break;
        case 2:
            messageColor = "#89E0A2"
            title = "Mediator"
            break;
        case 3:
            messageColor = "#F4D1BD"
            title = "Party B"
            break;
        }

        const messageStyle ={
            backgroundColor : messageColor,
        }

    return(

        <div className="message" style={{justifyContent:isSelf ?"left" :"right"}}>

            <div className="message-content" style={messageStyle}>
                <h6 className="message--text" id="message--title">{title}</h6>
                <p className="message--text">{text}</p>
            </div>

        </div>
        
        )
}
export default Message