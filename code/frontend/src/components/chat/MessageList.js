import React, { useRef, useEffect, useState } from 'react';
import Message from '../general/Message';
import { useSelector } from 'react-redux';
import LoadinBar from '../general/LoadingBar';
//Note that all styles of the list is done in the component

const MessageList =( { activeGroup ,maxHeight, isLoading,progress, task} )=> {
 
  const messagesEndRef = useRef(null);
  const {id} = useSelector(state=>state.user)

  const {messages} = useSelector(state=>state.chat[activeGroup])
  const [prevActiveGroup, setPrevActiveGroup] = useState(null);



  //change msg to data when i receive a messgae online
  //convet time to int and parsee it
  useEffect(() => {
    if (messagesEndRef.current) {
      if (prevActiveGroup !== activeGroup) {
        messagesEndRef.current.scrollIntoView({ behavior: 'instant' });
        setPrevActiveGroup(activeGroup);
      } else {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages, activeGroup, prevActiveGroup]);
  
    useEffect(() => {
    const handleResize = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "instant" });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


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
        height: maxHeight,
        overflowY: isLoading ? "hidden":"scroll",
        position:'relative',

        // opacity:isLoading ? "0.5" : "1",

        //Alternatively you can use the scrollable message list
      }}>

      {isLoading&&<div>

        <div style={{position:'absolute',
          width:'100%', height:'100%',
          
          backgroundColor:'rgba(0,0,0,0.2)',
          zIndex:'5', left:'50%', 
          transform:'translateX(-50%)'}}/>

          <LoadinBar
            progress={progress}
            task={task}

          />
      </div>}
      

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
