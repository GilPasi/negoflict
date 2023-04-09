import {useState, useEffect,useRef, useMemo} from "react";
import {useLocation} from "react-router-dom";
import Chat from "../components/chat/Chat";
import { useSelector, useDispatch } from "react-redux";
import {getPermName} from '../utils/permissions'
import { addGroupsProps, addHistoryMsg, postNewMessage, resetChatState, updateMsg } from "../store";
import ChatView from "../components/chat/ChatView";
import { useLazyGetCaseSideQuery, store } from "../store";




const ChatPageA = ()=>{
    // //hooks==========

    //fix key in map function , check if render messages ok with no mixing of messages 
    const location = useLocation()
    const dispatch = useDispatch()
    const [getGroupMember] =useLazyGetCaseSideQuery()

    const [activeGroup,setActiveGroup] = useState('groupG')

    const {username, role:userRole, first_name, id, access} = useSelector(state=>state.user)
    const groups = location.state?.groups ?? []
    const {caseId, caseTitle} = location.state ?? ''
    const connect = useRef(false)
    const {pos} = useSelector(state=>state.pos)
    const chat = useSelector(state=>state.chat[activeGroup])
    const mess2 = useSelector(state=>state.chat[activeGroup].messages)
    
   

   
   
    //=============
  

    //state=========
    const [userDetail,setUserDetail] = useState({})
   
    const [messages, setMessages] = useState([])
    const [isShuttled, setIsShuttled] = useState(false)
    const [inputText,setInputText] = useState('')


    const getSide =async ()=>{
        const {data} =await getGroupMember({caseId:caseId, user:id,access:access})
        setUserDetail(prevState=>({...prevState,['side']:data.side}))
        }

    useEffect(()=>{
        setMessages([])
        setMessages(mess2)

    },[mess2])

    

   
    useMemo(()=>{
        let role,userName
        role = getPermName({role:userRole})
        if(userRole === 'user'){
             userName = username.replace(/[^\w\s]/gi, '')
             getSide()
        }
        setUserDetail({username:userName, role:role})

    },[username,userRole]);

    useEffect(()=>{
        if(!groups)return
        dispatch(addGroupsProps({groups:groups}))
    },[])

    useEffect(()=>{
        if(userDetail?.role !== 'mediator')return
        const values = ['groupA','groupG','groupB']
        setActiveGroup(values[pos-1])
    },[pos])

    useEffect(()=>{
        
        const {messages} = chat
        setMessages(messages)
    },[activeGroup])

    useEffect(()=>{
        if(userDetail?.role !== 'user')return
        const ChatSide = userDetail?.side ?? null
        if(!ChatSide)return
        if(isShuttled)
            setActiveGroup(`group${ChatSide}`)
        else
            setActiveGroup('groupG')
    },[isShuttled])


   
    



    const handleRecivedMsg = (msg)=>{
        const {to, type} = msg

        if(type !== 'groupChat')return
      
        dispatch(updateMsg({id:to, message:msg}))
       
    };


   const handleConnect = (value)=>{
    connect.current = value
    if(value===false)
        dispatch(resetChatState())
   };
   

   const handleHistoryMsg =async (history,groupid)=>{
    let messages = []
    messages = [...history.messages]
    messages.sort((a,b)=>a.time - b.time)
    dispatch(addHistoryMsg({id:groupid,messages:messages}))
   }
  

   const handleShuttle =()=> {
    setIsShuttled(prevState=>{
        return(!prevState)    
    })

   
}
const handleSend = (text)=>{
    const inputDetail = {msg:text,to:chat.id,ext:{side:activeGroup.slice(-1),name:first_name,userId:id}}
    dispatch(postNewMessage(inputDetail))
    dispatch(updateMsg({message:inputDetail,id:chat.id}))
  
}


    
 



    return(
        <div>
            <ChatView
            isMediator={userDetail.role==='mediator'?true:false}
            caseId={caseId.slice(-7)}
            handleShuttle={handleShuttle}
            isShuttled={isShuttled}
            messages={messages}
            handleSend={handleSend}
            
            />
            <Chat
            username={username}
            onConnect={handleConnect}
            onTextMsg={handleRecivedMsg}
            onHistory={handleHistoryMsg}
            groups={groups}
            inputText={inputText}
            firstName={first_name}
            
            />
           
     

        </div>

    )

}

export default ChatPageA