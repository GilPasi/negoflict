import {useState, useEffect,useRef, useMemo} from "react";
import {useLocation} from "react-router-dom";
import Chat from "../components/chat/Chat";
import { useSelector, useDispatch } from "react-redux";
import {getPermName} from '../utils/permissions'
import { addGroupsProps, addHistoryMsg, postNewMessage, resetChatState, setPrivateGroup, updateMsg } from "../store";
import ChatView from "../components/chat/ChatView";
import { useLazyGetCaseSideQuery, store } from "../store";
import ShuttleSwitch from "../components/general/ShuttleSwitch";




const ChatPageA = ()=>{
    // //hooks==========

    //  check if render messages ok with no mixing of messages 
    const location = useLocation()
    const dispatch = useDispatch()
    const [getGroupMember] =useLazyGetCaseSideQuery()

    const [activeGroup,setActiveGroup] = useState('groupG')

    const {username, role:userRole, first_name, id, access} = useSelector(state=>state.user)
    const groups = location.state?.groups ?? []
    const {caseId} = location.state ?? ''
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



    const getSide =async (role)=>{ //get user side of conflict
        if(role==='mediator'){
            setUserDetail(prevState=>({...prevState,['side']:'M'}))
            return
        }
        const {data,error} = await getGroupMember({caseId:caseId, user:id,access:access})
        if(error){
            console.log(error)
            return
        }
        dispatch(setPrivateGroup(data.side))
        setUserDetail(prevState=>({...prevState,['side']:data.side}))
        }

    useEffect(()=>{
        setMessages(mess2)
    },[mess2])

    

    useMemo(()=>{  //set user detail role and username
        let role,userName = username
        role = getPermName({role:userRole})
        if(role === 'user')
             userName = username.replace(/[^\w\s]/gi, '')
 
        getSide(role)
        setUserDetail(prevState=>({...prevState,username:userName, role:role}))

    },[username,userRole]);

    useEffect(()=>{  //save the groups properties (agora) 
        if(!groups)return
        dispatch(addGroupsProps({groups:groups}))
    },[])

    useEffect(()=>{ //set what group is active now to view ther messages for mediator
        if(userDetail?.role !== 'mediator')return
        const values = ['groupA','groupG','groupB']
        setMessages(()=>[])
        setActiveGroup(values[pos-1])
    },[pos])

    useEffect(()=>{ // set the message view based of active group
        const {messages} = chat
        setMessages(messages)
    },[activeGroup])

    useEffect(()=>{ //set what group is active now to view ther messages for user
        if(userDetail?.role !== 'user')return
        const ChatSide = userDetail?.side ?? null
        if(!ChatSide)return
        if(pos !== 2){
            setActiveGroup(`group${ChatSide}`)
        }
        else
            setActiveGroup('groupG')
    },[pos])


    const handleRecivedMsg = (msg)=>{ //handle recived messages only in real time
        const {to, type} = msg

        if(type !== 'groupChat')return

        const modifiedObject = {
            ...msg,
            msg: msg.data,
            time: parseInt(msg.time),
          };
          
          delete modifiedObject.data;

         
          

        dispatch(updateMsg({id:to, message:modifiedObject}))

    };


   const handleConnect = (value)=>{ //handle the connection property
    connect.current = value
    if(value===false)
        dispatch(resetChatState())
   };
   

   const handleHistoryMsg =async (history,groupid)=>{ //gets history messages work's only ones
    let messages = []
    messages = [...history.messages]
    messages.sort((a,b)=>a.time - b.time)
    dispatch(addHistoryMsg({id:groupid,messages:messages}))
   }

  

   const handleShuttle =()=> {// set shuttle mode
    setIsShuttled(prevState=>{
        return(!prevState)    
    })
}

const handleSend = (text)=>{
    const inputDetail = {msg:text,to:chat.id,ext:{side:activeGroup.slice(-1),name:first_name,userId:id,sender:userDetail.side}}
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
            activeGroup={activeGroup}
            handleSend={handleSend}
            
            />
            <Chat
            username={userDetail.username}
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