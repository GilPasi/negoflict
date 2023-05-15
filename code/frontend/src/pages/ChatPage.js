import {useState, useEffect,useRef, useMemo} from "react";
import {useLocation} from "react-router-dom";
import Chat from "../components/chat/Chat";
import { useSelector, useDispatch } from "react-redux";
import {getPermName} from '../utils/permissions'
import { addGroupsProps, addHistoryMsg, postNewMessage, resetChatState, setPrivateGroup, updateMsg, addCaseId } from "../store";
import ChatView from "../components/chat/ChatView";
import { useLazyGetCaseSideQuery } from "../store";
import { useGetChatGroupsQuery } from "../store";
import useMsg from "../hooks/useMsg";



const ChatPage = ()=>{
    // //hooks==========
    const location = useLocation()
    const dispatch = useDispatch()
    const [getGroupMember] =useLazyGetCaseSideQuery()  
    const connect = useRef(false)
    const {SaveMessage} = useMsg()
    //=========
     //state=========
     const [activeGroup,setActiveGroup] = useState('groupG') //holds the group view now
     const [userDetail,setUserDetail] = useState({}) //user importent data
     const [isShuttled, setIsShuttled] = useState(false) //shutll mode still not in use
     const [chatGroupData,setChatGroupData] = useState([]) //holds the 3 sides of the chat groups
     const [fetch,setFetch] = useState(false)
     const [role,setRole] = useState('')
     const [mute, setMute] = useState(false)
     const [taskProgress, setTaskProgress] = useState({progress:0, task:'connecting'})
     const [notificationGroups, setNotifictionGroup] = useState([])
     //=================
   
 
    //values========
    const {username, role:userRole, first_name, id, access} = useSelector(state=>state.user)
    const allChatGroups = useSelector(state=>state.chat)
    const groups = location.state?.groups ?? []
    const {caseId} = location.state ?? ''
    const {pos} = useSelector(state=>state.pos)
    const chat = useSelector(state=>state.chat[activeGroup])
    const centerGroup = groups.find(group => group.groupname.endsWith('G'));
    console.log('chat',chat)
    //=============
    //apiFetch==========
    const {data,error, isSuccess, isFetching} =useGetChatGroupsQuery({CaseId:caseId}) 
    //==========

    

    //functions============
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
        setUserDetail(prevState=>({...prevState,['side']:data.side,['memberId']:data.id}))
    };
    //==============

    //useMemo=============
    useMemo(()=>{  //set user detail role and username
        let role,userName = username
        role = getPermName({role:userRole})
        dispatch(addCaseId(caseId))
        setRole(role)
        if(role === 'user')
             userName = username.replace(/[^\w\s]/gi, '')
 
        getSide(role)
        setUserDetail(prevState=>({...prevState,username:userName, role:role}))

    },[username,userRole]);

    useMemo(() => {
        if(isFetching)return
        if(error){
            console.log(error)
            return
        }
        if (!isSuccess)return
        console.log(data)
        
          setChatGroupData(()=>data)
       
      }, [data, isSuccess, error]);
    //==============

    //useEffect===========
    useEffect(()=>{
        if(userDetail.role==='mediator'){
            setNotifictionGroup([false,false,false])
            return
        }
        setNotifictionGroup([false,false])
    },[])

    useEffect(()=>{  //save the groups properties (agora) 
        if(!groups)return
        dispatch(addGroupsProps({groups:groups}))
    },[]);

    useEffect(()=>{ //set what group is active now to view ther messages for mediator
        if(userDetail?.role !== 'mediator')return
        const values = ['groupA','groupG','groupB']
        setActiveGroup(values[pos-1])
    },[pos]);

   
    useEffect(()=>{ //set what group is active now to view ther messages for user
        if(userDetail?.role !== 'user')return
        const ChatSide = userDetail?.side ?? null
        if(!ChatSide)return
        if(pos !== 2){
            setActiveGroup(`group${ChatSide}`)
        }
        else
            setActiveGroup('groupG')
    },[pos]);
    //===========================
   

    //handles=============
    const handleRecivedMsg = (msg)=>{ //handle recived messages only in real time
        console.log(msg)
        const {to, type} = msg
        if(type !== 'groupChat')return
        HandleNotification(to)
        if(msg['id']=== chat.messages[chat.messages.length -1]['id'])
            return

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
        setFetch(true)
        handleProgress('fetch history', 30)
    };


   const handleShuttle =()=> {// set shuttle mode
    setIsShuttled(prevState=>{
        return(!prevState)
    })
    };
    const handleMute = (state)=>{
        setMute(state)
    }
    const handleProgress = (taskUpdate, progUpdate, set)=>{
     
        setTaskProgress(prev=>{
            const update = {
            progress:prev['progress']+ progUpdate,
            task:taskUpdate
            }
            return update
        })
    }

    const HandleNotification = (to)=>{
        const {groupA, groupB, groupG} = allChatGroups
        let groupArray =[]

        if(groupA.id!=='')
            groupArray.push(groupA)
        if(groupG.id!=='')
            groupArray.push(groupG)
        if(groupB.id!=='')
            groupArray.push(groupB)

        const idRecive =  groupArray.find(group_id=>group_id.id===to)

        if(idRecive.id === chat.id)
            return

     
            

        if(userDetail.role==='mediator'){
            if(idRecive.side==='G')
                setNotifictionGroup(prev=>[prev[0],true,prev[2]])
            
            else if(idRecive.side==='A')
                setNotifictionGroup(prev=>[true,prev[1],prev[2]])
            else
                setNotifictionGroup(prev=>[prev[0],prev[1],true])
        }
        else{
            if(idRecive.side==='G')
                setNotifictionGroup(prev=>[prev[0],true])
            else
                setNotifictionGroup(prev=>[true,prev[1]])
        }
    }
    const HandleCloseNotification = (side)=>{
        let arrayNot = [...notificationGroups]

        arrayNot[side] = false
        setNotifictionGroup(arrayNot)
    }
    
    
    const handleSend = (text)=>{ //handling the msg send and handle save the msg to data base using the useMsg hook
        const side = activeGroup.slice(-1)
        const inputDetail = {msg:text,to:chat.id,ext:{side:side,name:first_name,userId:id,sender:userDetail.side}}
        dispatch(postNewMessage(inputDetail))
        dispatch(updateMsg({message:inputDetail,id:chat.id}))
        
        const groupChat = chatGroupData.find(group=>group.chat === side)
        const member = userDetail?.memberId ?? ''
        SaveMessage({message:inputDetail,groupChatId:groupChat.id,memberId:member})
    };
    //============
    return(
        <div>
            <ChatView
            isMediator={userDetail.role==='mediator'?true:false}
            caseId={caseId.slice(-7)}
            handleShuttle={handleShuttle}
            isShuttled={isShuttled}
            activeGroup={activeGroup}
            handleSend={handleSend}
            fetch={fetch}
            role={role}
            muted={mute}
            centerGroup={centerGroup}
            loadingData={taskProgress}
            groups = {{agora:groups,server:chatGroupData,caseId:caseId}}
            notifications={notificationGroups}
            closeNotification = {HandleCloseNotification}
            />
            <Chat
            username={userDetail.username}
            onConnect={handleConnect}
            onTextMsg={handleRecivedMsg}
            onHistory={handleHistoryMsg}
            onMute={handleMute}
            groups={groups}
            firstName={first_name}
            isShuttled={role==='user'?null : isShuttled}
            centerGroup={centerGroup}
            handleProgress={handleProgress}
            caseId={caseId}

            />
        </div>
    )
}
export default ChatPage