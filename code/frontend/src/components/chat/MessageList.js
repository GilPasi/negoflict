import React, { useRef, useEffect } from 'react';
import Message from '../general/Message';

const MessageList =( { messages } )=> {
  const messagesEndRef = useRef(null);

  console.log(messages)

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  

  return (
    <div 
    style={{
        height: '860px', 
        width: '800px',
        overflowY: 'scroll', 
      }}
    >
      {messages.map(message => (
         
            <Message 
                key={message.text}
                text={message.text}
                sender={message.sender}
                isSelf={message.isSelf}
                />
        
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList
