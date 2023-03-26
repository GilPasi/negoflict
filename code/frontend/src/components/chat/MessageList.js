import React, { useRef, useEffect } from 'react';
import Message from '../general/Message';

const MessageList =( { messages, position } )=> {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const filteredMessages = messages.filter((message) => message.position === position);


  return (
    <div 
    style={{
        height: '400px', 
        width: '100%',
        overflowY: 'scroll', 
        margin:'0',
      }}
    
    >
      {filteredMessages.map(message => (
         
            <Message 
                key={message.id}
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
