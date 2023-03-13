import React, { useRef, useEffect } from 'react';
import Message from '../general/Message';

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
                time = {message.time}
                name = {message.senderName}
                />
        
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList
