import React, { useRef, useEffect, useState, useMemo } from 'react';
import Message from '../general/Message';
import { useSelector } from 'react-redux';
import LoadinBar from '../general/LoadingBar';
import '../../styles/components/loading_bar.css'
import useChat from '../../hooks/useChat';
import { useLocation } from 'react-router-dom';
import {addGroupsProps, addHistoryMsg, updateMsg, useLazyGetCaseSideQuery,setActiveGroup, clearMsg,resetChatState, } from "../../store";
import {useDispatch} from "react-redux";
import {getPermName} from "../../utils/permissions";
import {ChatChangesNotifications} from '../chat/ChatChangesNotifications'
import { useNavigate } from 'react-router-dom';
import  useAlert from '../../hooks/useAlert'


//Note that all styles of the list is done in the component

const MessageList =( { maxHeight, isChatStart } )=> {
 //hooks===================================================================================================
  const location = useLocation();
  const navigate = useNavigate();
  const {justText} = useAlert()
  const {onlineStatusListener, getHistoryMsgs, MsgListener, presenceListener, getPresenceStatus,removeEventById,disconnect} = useChat();
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const syncronize = useRef(false);
 //===================================================================================================
 //state===================================================================================================
 const [isOnline, setIsOnline] = useState(false)
 const [activeGroupView,setActiveGroupView] = useState('groupG')
 const [prevActiveGroup, setPrevActiveGroup] = useState(null);
 const [isLoading,setIsLoading] = useState(true) //holds the loading status //change to dynamic loading
 const [progress,setProgress] = useState(0)
 const [typingNotification,setTypingNotification] = useState(null)
 const [connectionNotification,setConnectionNotification] = useState(null)
 const [deleteNotification,setDeleteNotification] = useState(null)
//===================================================================================================
  //location&&store===================================================================================================
  const {groups} = location.state ?? []
  const {caseId} = location.state ?? ''
  const {id, role, username, first_name} = useSelector(state=>state.user)
  const {pos} = useSelector(state=>state.position)
  const {messages} = useSelector(state=>state.chat[activeGroupView])
  const messageDetail = useSelector(state=>state.message)
  const messageRefs = messages.map(() => React.createRef());
  const searchTerm = useSelector(state=>state.searchMsg)
  const [searchIndex, setSearchIndex] = useState([])
  const [index, setIndex] = useState(-1);


  //===================================================================================================
  //varible===================================================================================================
  const roleName = getPermName({role})
  const userSide = useRef( roleName==='mediator'? 'M':'')
  //===================================================================================================
  //lazyApi======
  const [getGroupMember] =useLazyGetCaseSideQuery()
//===================================================================================================
  //useEffect===================================================================================================
  useEffect(()=>{
    if(searchTerm === ''){
      setSearchIndex([])
      setIndex(()=>messageRefs.length-1)
      return
    }
    const indexs = messages.map((msg, i) => 
    msg.msg.toLowerCase().includes(searchTerm.toLowerCase()) ? i : null).filter(i => i !== null).sort((a, b) => messages[b].time - messages[a].time);
    const i = indexs[0]
    if(!messageRefs[i]?.current){
      setSearchIndex([])
      setIndex(()=>-1)
      return
    }
    setSearchIndex(()=>indexs)
    setIndex(()=>0)
    

  },[searchTerm])

  useEffect(()=>{
    if(index === -1) return
    if(searchIndex.length === 0){
      messageRefs[index]?.current.scrollIntoView({ behavior: 'smooth' })
      return
    }
    const i = searchIndex[index]
    messageRefs[i]?.current.scrollIntoView({ behavior: 'smooth' })

  },[index])










  useEffect(()=>{
      setProgress(prev=>prev+10)
      dispatch(addGroupsProps({groups:groups}))
      addConnectionListener()
      addPresenceListener()
      MsgListener({handleMessage:handleReceivedMsg})

      roleName==='user'&& getUserDetails()
  },[])

  useEffect(()=>{
    return()=>{
      removeEventById({id:'messageList'})
      removeEventById({id:'presenceListener'})
    }
  },[])
  

  useEffect(()=>{
    if(typingNotification?.userId === deleteNotification)
      setTypingNotification(null)

      return()=>{
        setDeleteNotification(null)
      }

  },[deleteNotification])
 
    const getUserDetails =async ()=>{
     const {data, error} = await getGroupMember({caseId:caseId, user:id})
        if(error) {
            console.log('err',error)
            return
        }
        userSide.current = data.side
        setProgress(prev=>prev<100&&prev+25)
    }

  const addConnectionListener = ()=>{
         onlineStatusListener(
            {id:'messageList',handleConnection:connectionMsg=>{
              const isConnect = connectionMsg === 'connected'
              if(connectionMsg === 'disconnected')
                handleDisconnect()

              setIsOnline(()=>isConnect)}})
          setProgress(prev=>prev<100&&prev+25)
  }
  const addPresenceListener = ()=>{
    presenceListener({id:'messege_notification',presentsHandler:handleNotifications})
  }

  const handleNotifications = (msg)=>{
    const {userId} = msg[0]
    getPresenceStatus({usernames:[userId]}).then(({result})=>{
      const {uid,ext} = result[0]
      const desc = ext.split('=') 
      const status = desc[0]
      const user = desc[1]
  
      if(user === username || user === first_name || user=== undefined) return
      const connectionNotification = status === 'online' || status === 'offline'
      if(connectionNotification){
     
        const msg = status === 'online'? `${user} is online now`: `${user} has disconnected`
        setConnectionNotification({userId:user,msg:msg})
        if(status !== 'online')
          setDeleteNotification(()=>user)
        setTimeout(()=>setConnectionNotification(prev=>(null)),5000)
      }
      else if(status === 'typing' || status === 'stop_typing'){
    
        const msg = status === 'typing'? `${user} is typing...`:null
        if(msg!==null){
          
          setTypingNotification({userId:user,msg:msg})
          setTimeout(()=>setTypingNotification(prev=>(null)),10000)
        }
     
        else
          setDeleteNotification(()=>user)
      }
      else if(status === 'remove'){
        if(roleName === 'user'){
            const agoraUsername = username.replace(/[^\w\s]/gi, '');
        if(agoraUsername === user){
           handleDisconnect()
           disconnect()
           justText({text:'You have been kicked from chat'})
           navigate(`/user/cases/?open_close=True`, {replace: true, state:{remove:true}})
        }
           
           
        }


        const msg = `${user} has removed from the chat`
        setConnectionNotification({userId:user,msg:msg})
        setTimeout(()=>setConnectionNotification(prev=>(null)),5000)
      }
    })

  }

  

  

  

  useEffect(() => {
    if(!messageDetail || syncronize.current || messageDetail.msg==='' ) return
    syncronize.current = true
   
    
    handleReceivedMsg(messageDetail, true)
   
    return () => {
      syncronize.current = false
      dispatch(clearMsg())
    }

  },[messageDetail])


  useEffect(()=>{
    if(!isOnline || !groups) return
    setIsLoading(()=>true)
    Promise.all(groups.map(group =>
    getHistoryMsgs({groupId: group?.groupid}).then(res =>{
     handleHistoryMsg(res, group?.groupid)})
    )).catch(err => console.log('in getHistoryMsgs', err))
    .finally(()=>{
      setProgress(()=>100)
      setIsLoading(()=>false)})
    
}, [isOnline, groups])

  //handlers========================================
   const handleHistoryMsg =async (history,groupid)=>{ //gets history messages work's only ones
        let messages = []
       
        messages = [...history.messages]
        messages.sort((a,b)=>a.time - b.time)
  
        dispatch(addHistoryMsg({id:groupid,messages:messages}))
    };

    

    const handleDisconnect = ()=>{
      dispatch(resetChatState())
      dispatch(clearMsg())
    }


  const handleReceivedMsg = (msg,isLocalMsg)=>{ //handle received messages only in real time
        const {to, chatType} = msg
        if(chatType !== 'groupChat' &&!isLocalMsg)return

            const modifiedObject = {
                ...msg,
                msg: msg.msg,
                time: parseInt(msg.time),
              };

            delete modifiedObject.data;
            dispatch(updateMsg({id:to, message:modifiedObject}))
    };

  useEffect(()=>{ //set what group is active now to view ther messages for mediator
        if(roleName === 'mediator'){
          const values = ['groupA','groupG','groupB']
          setActiveGroupView(()=>values[pos-1])
          dispatch(setActiveGroup(values[pos-1]))
        
        }
        else if(roleName === 'user'){
          const {current} = userSide ?? null
          if(!current)return
          if(pos !== 2){
              setActiveGroupView(()=>`group${current}`)
              dispatch(setActiveGroup(`group${current}`))
          }
          else{
              setActiveGroupView(()=>'groupG')
              dispatch(setActiveGroup('groupG'))
          }
        }

    },[pos]);
    


   

  //change msg to data when i receive a messgae online
  //convet time to int and parsee it
  useEffect(() => {
    if (messagesEndRef.current) {
      if (prevActiveGroup !== activeGroupView) {
        messagesEndRef.current.scrollIntoView({ behavior: 'instant' });
        setPrevActiveGroup(activeGroupView);
      } else {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages, activeGroupView, prevActiveGroup]);
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
    position:'fixed',
    zIndex:'100',
    left:'50%',
    top:'40%',
    transform: 'translate(-50%,-50%)',
    fontWeight:'bold',
    fontSize:'X-large',
    textAlign:'start',
    display:'flex',
    flexDirection:'column',
    zIndex:'12',

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
      isLoading&&
      <div>

        <div
          style={lodaingStyle}/>

          <LoadinBar
            progress={progress}
            task='fetching data'
          />
          </div>}
      {
      (!isChatStart&&roleName==='user'&&!isLoading)
      &&
      <div>
      <div
          style={preChatStyle}/>
      <span
        style={preChatTitleStyle}>Waiting Host to start the
        <div className="loading-dots" style={{display:'flex',alignItems:'end', zIndex:'2000'}}>
          <span>converstation</span>
          <span className="dot" style={{marginBottom:'5px', marginLeft:'5px'}}></span>
          <span className="dot" style={{marginBottom:'5px', marginLeft:'5px'}}></span>
          <span className="dot" style={{marginBottom:'5px', marginLeft:'5px'}}></span>
        </div>
      </span>

      </div>
      }
      {searchIndex.length>0&&
      <div className='search-holder-place'>
      <button onClick={()=>setIndex(prev=>prev<searchIndex.length?prev+1:searchIndex.length)} className='button_up_down_up' ><span>{'<'}</span></button>
        <span className='counter_seartch_messages'>{`${index!==-1?index+1:0}/${searchIndex.length}`}</span>
   
        <button onClick={()=>setIndex(prev=>prev>0?prev-1:0)} className='button_up_down_down' ><span>{'>'}</span></button>
      </div>
}


      {messages&& messages.map((message,index) => (
        <div key={`${message.id}_${message.time}`} ref={messageRefs[index]}>

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
      {connectionNotification&&<ChatChangesNotifications position={maxHeight} intersept={typingNotification?-30:0} msg={connectionNotification.msg}/>}
      {typingNotification&&<ChatChangesNotifications position={maxHeight} intersept={0} msg={typingNotification.msg}/>}


    </div>
  );
}
export default MessageList
