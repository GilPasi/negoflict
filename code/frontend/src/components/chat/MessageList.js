import React, { useRef, useEffect, useState } from 'react';
import Message from '../general/Message';
import { useSelector } from 'react-redux';
import LoadinBar from '../general/LoadingBar';
import '../../styles/components/loading_bar.css'
//Note that all styles of the list is done in the component

const MessageList =( {activeGroup ,maxHeight, isLoading,progress, task,chatStart} )=> {
 
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

  const lodaingStyle = {
    position:'absolute',
    width:'100%', height:'100%',
    backgroundColor:'rgba(0,0,0,0.2)',
    zIndex:'5', left:'50%', 
    transform:'translateX(-50%)'
  }
  const preChatStyle ={
    zIndex:'10', 
    position:'fixed',
    width:'80%',height:'50%',
    backgroundColor:'gray', 
    left:'50%',
    top:'50%',  
    transform: 'translate(-50%,-50%)',
    opacity:'0.6',
    borderRadius:'10%'
}
const preChatTitleStyle = {
    position:'absolute',
    zIndex:'100',
    left:'50%',
    top:'30%',
    transform: 'translate(-50%,-50%)',
    fontWeight:'bold',
    fontSize:'X-large',
    textAlign:'start',
    display:'flex',
    flexDirection:'column'
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

        <div 
          style={lodaingStyle}/>

          <LoadinBar
            progress={progress}
            task={task}
          />
          </div>}
      {!(isLoading)&&!(chatStart)&&
      <div>
      <div 
          style={preChatStyle}/>
      <span
        style={preChatTitleStyle}>Waiting Host to start the 
        <div className="loading-dots" style={{display:'flex',alignItems:'end'}}>
          <span>converstation</span>
          <span className="dot" style={{marginBottom:'5px', marginLeft:'5px'}}></span>
          <span className="dot" style={{marginBottom:'5px', marginLeft:'5px'}}></span>
          <span className="dot" style={{marginBottom:'5px', marginLeft:'5px'}}></span>
        </div>
      </span>
      
      </div>
      }
      

      {messages&& messages.map(message => (
        <div key={message.id}>
         
            <Message 
                key={getKey(message.time)}
                text={message.msg}
                sender={message.ext?.sender}
                isSelf={isSelf(message.ext?.userId)}
                time = {convertTime(message.time)}
                name = {message.ext.name}
                />

        </div>

      ))}
    
     

      <div ref={messagesEndRef} />

    </div>
  );
}
export default MessageList
