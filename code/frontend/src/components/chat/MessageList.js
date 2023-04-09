import React, { useRef, useEffect, useState } from 'react';
import Message from '../general/Message';
import { useSelector } from 'react-redux';
//Note that all styles of the list is done in the component

const MessageList =( { messages } )=> {
  const messagesEndRef = useRef(null);
  const {id} = useSelector(state=>state.user)

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const convertTime = (time)=>{
    let date
    if(!time)
      date= new Date();
    else
      date = new Date(time * 1000);

    const options ={
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      hour: 'numeric',
      minute: 'numeric',
    }
    return date.toLocaleString(undefined, options)
  }
  const isSelf =(userId)=>{
    return userId === id
  }


 

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
        paddingTop: '12em',
        
      }}
    
    >
      {messages.map(message => (
         
            <Message 
                key={message.msg}
                text={message.msg}
                sender={message.ext?.name}
                isSelf={isSelf(message.ext?.userId)}
                time = {convertTime(message.time)}
                name = {message.ext.name}
                />
        
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
export default MessageList
