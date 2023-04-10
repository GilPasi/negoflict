import React, { useRef, useEffect, useState } from 'react';
import Message from '../general/Message';
import { useSelector } from 'react-redux';
//Note that all styles of the list is done in the component

const MessageList =( { activeGroup } )=> {
  const messagesEndRef = useRef(null);
  const {id} = useSelector(state=>state.user)
  const {messages} = useSelector(state=>state.chat[activeGroup])


  //change msg to data when i receive a messgae online
  //convet time to int and parsee it


  useEffect(() => {
    
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const convertTime = (time)=>{
    let date
    if(!time)
      date= new Date();
    else
      date = new Date(time);

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

  const getKey = (timeKey)=>{
    if(timeKey)return timeKey
    return Math.floor(Math.random() * 100000) + 1
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

      {messages&& messages.map(message => (
         
            <Message 
                key={getKey(message.time)}
                text={message.msg}
                sender={message.ext?.sender}
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
