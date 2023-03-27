import React, { useRef, useEffect } from 'react';
import Message from '../general/Message';
//Note that all styles of the list is done in the component

const MessageList =( { messages, position } )=> {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const filteredMessages = messages.filter((message) => message.position === position);

  console.log('in list')
  console.log(messages.firstName)

  return (
    <div 
    style={{
        width:'100%',
        // height: "350px",
        // overflowY: 'scroll', 
        //Alternatively you can use the scrollable message list
        //Nonetheless it will cause no responsability throughout 
        //different d
        paddingBottom: '10em',
        paddingTop: '10em',
        
      }}
    >
      {filteredMessages.map(message => (
         
            <Message 
                key={message.text}
                text={message.text}
                sender={message.sender}
                isSelf={message.isSelf}
                time = {message.time}
                name = {message.senderName}
                />
        
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
export default MessageList
