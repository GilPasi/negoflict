import React, { useRef, useEffect, useState } from 'react';
import Message from '../general/Message';
import { useSelector } from 'react-redux';
import LoadinBar from '../general/LoadingBar';
import '../../styles/components/loading_bar.css'
import useChat from '../../hooks/useChat';
import { useLocation } from 'react-router-dom';
import {addGroupsProps, addHistoryMsg, updateMsg, useLazyGetCaseSideQuery,} from "../../store";
import {useDispatch} from "react-redux";
import {getPermName} from "../../utils/permissions";

//Note that all styles of the list is done in the component

const MessageList =( { maxHeight, isLoading,progress, task} )=> {
 //hooks===================================================================================================
  const location = useLocation();
  const {onlineStatusListener, getHistoryMsgs, MsgListener} = useChat();
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
 //===================================================================================================

  //state===================================================================================================
  const {groups} = location.state ?? []
  const {caseId} = location.state ?? ''
  const {id, role} = useSelector(state=>state.user)
  const roleName = getPermName({role})
  const {pos} = useSelector(state=>state.position)
  const [isOnline, setIsOnline] = useState(false)
  const [activeGroup,setActiveGroup] = useState('groupG')
  const side =useRef( roleName==='mediator'? 'M':'')

  const {messages} = useSelector(state=>state.chat[activeGroup])
  const [prevActiveGroup, setPrevActiveGroup] = useState(null);

  //===================================================================================================
    //lazyApi======
    const [getGroupMember] =useLazyGetCaseSideQuery()

  //useEffect===================================================================================================

  useEffect(()=>{
      dispatch(addGroupsProps({groups:groups}))
      addConnectionListener({id:'messageList',handleConnection:connectionMsg=>setIsOnline(()=>connectionMsg === 'connected')})
      MsgListener({handleMessage:handleReceivedMsg})
      roleName==='user'&& getUserDetails()
  },[])

    const getUserDetails =async ()=>{
     const {data, error} = await getGroupMember({caseId:caseId, user:id})
        if(error) {
            console.log('err')
            return
        }
        side.current = data.side
    }

  const addConnectionListener = ()=>{
         onlineStatusListener(
            {id:'messageList',handleConnection:connectionMsg=>setIsOnline(()=>connectionMsg === 'connected')})
  }

  useEffect(()=>{

    if(!isOnline || !groups) return

    Promise.all(groups.map(group =>
    getHistoryMsgs({groupId: group?.groupid}).then(res => handleHistoryMsg(res, group.groupid))
    )).catch(err => console.log('in getHistoryMsgs', err));
}, [isOnline, groups])

  //handlers========================================
   const handleHistoryMsg =async (history,groupid)=>{ //gets history messages work's only ones
        let messages = []
        messages = [...history.messages]
        messages.sort((a,b)=>a.time - b.time)
        dispatch(addHistoryMsg({id:groupid,messages:messages}))
    };
  const handleReceivedMsg = (msg)=>{ //handle received messages only in real time
        const {to, chatType} = msg
        if(chatType !== 'groupChat')return

            const modifiedObject = {
                ...msg,
                msg: msg.msg,
                time: parseInt(msg.time),
              };

            delete modifiedObject.data;
            dispatch(updateMsg({id:to, message:modifiedObject}))
    };

  useEffect(()=>{ //set what group is active now to view ther messages for mediator
        if(roleName !== 'mediator')return
        const values = ['groupA','groupG','groupB']
        setActiveGroup(()=>values[pos-1])
    },[pos]);
    console.log(side)

  useEffect(()=>{ //set what group is active now to view ther messages for user
        if(roleName !== 'user')return
        const {current} = side ?? null
        if(!current)return
        if(pos !== 2){
            setActiveGroup(()=>`group${current}`)
        }
        else
            setActiveGroup(()=>'groupG')
    },[pos]);

    console.log(activeGroup)
    console.log(pos)


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
//
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

      {
      // isLoading&&
      <div>

        <div
          style={lodaingStyle}/>

          <LoadinBar
            progress={progress}
            task={task}
          />
          </div>}
      {
      // (isLoading)
      // &&
      // <div>
      // <div
      //     style={preChatStyle}/>
      // <span
      //   style={preChatTitleStyle}>Waiting Host to start the
      //   <div className="loading-dots" style={{display:'flex',alignItems:'end'}}>
      //     <span>converstation</span>
      //     <span className="dot" style={{marginBottom:'5px', marginLeft:'5px'}}></span>
      //     <span className="dot" style={{marginBottom:'5px', marginLeft:'5px'}}></span>
      //     <span className="dot" style={{marginBottom:'5px', marginLeft:'5px'}}></span>
      //   </div>
      // </span>

      // </div>
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
