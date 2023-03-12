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
        height: '860px', 
        width: '800px',
        overflowY: 'scroll', 
      }}
    >
      {filteredMessages.map(message => (
         
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
