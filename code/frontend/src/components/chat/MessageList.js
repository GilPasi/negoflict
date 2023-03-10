import React, { useRef, useEffect } from 'react';
import Message from '../generals/Message';

const MessageList =( { messages } )=> {
  const messagesEndRef = useRef(null);

  console.log(messages)

  useEffect(() => {
    // Scroll to the bottom of the message box when new messages are received
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  

  return (
    <div 
    style={{
        height: '1000px', // set a fixed height for the container
        width: '800px',
        overflowY: 'scroll', // add vertical scrollbar when content exceeds container height
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
