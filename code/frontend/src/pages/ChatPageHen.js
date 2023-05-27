import useChat from "../hooks/useChat";
import { useEffect, useState } from "react";
import { useLocation} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {useGetChatTokenQuery, useGetFullUsersByCaseQuery} from "../store";
import { addHistoryMsg } from "../store";
// import ChatView from "../components/chat/ChatView";
import { getPermName } from "../utils/permissions";
import ChatViewHen from "./ChatViewHen";


const ChatPageHen = ()=>{
    //hooks==========
    const location = useLocation()
    const { connect, getHistoryMsgs, publishPresence, onlineStatusListener, getGroupMember, groupListener, subscribePresence,muteAllMembers} = useChat()
    const dispatch = useDispatch()
    //===================================================================================================

    //state=========
    const groups = location.state?.groups ?? [] //holds the 3 sides of the chat groups by agora
    const {caseId, caseTitle,caseCategory} = location.state ?? '' //holds the case id
    const {username, role:userRole, first_name, id, access} = useSelector(state=>state.user) //user important data
    const [connected,setConnected] = useState(false) //holds the connection status
    const [groupMembers,setGroupMembers] = useState([]) //holds the group members agora data
    //===================================================================================================

    //variables=========
    const roleName = getPermName({role:userRole}) //user role name 'mediator'/user
    const centeredGroup = groups.find(group => group.groupname.endsWith('G')); //holds the center group agora data
    //===================================================================================================
    //apiFetch==========
    const {data:token} = useGetChatTokenQuery({username}) //get the agora token
    const {data:users} = useGetFullUsersByCaseQuery({caseId}) //get the users data


    //===================================================================================================

    //useEffect==========
    //connect to agora chat and add listeners
    useEffect(  ()=>{
        if(!token) return
        const {userToken} = token
        if(!userToken) return
        connectToChat({userToken})
            .then(()=> {
                addGroupListeners()
                addConnectionListeners()
            })


    },[token]);

    //get history and members after connection to agora chat
    //and publish user status
    //and get the users data from agora
    useEffect(()=>{
        if(!connected)return
        presentsStatus({status:'online'})
        handleGetHistory()
        Getmembers()
    },[connected]);
    
    useEffect(()=>{
        if(groupMembers.length===0) return
        subscribeToPresence()
        
    },[groupMembers])
    //===================================================================================================

    //functions============
    //add listeners to connection status if connected or disconnected
    const addConnectionListeners = ()=>{
        onlineStatusListener(
            {handleConnection:connectionMsg=>setConnected(()=>connectionMsg === 'connected')})
    }

    const addGroupListeners = ()=>{
        groupListener({handleGroupChange:res=>console.log('group changed',res)})
    }

    //connect to agora chat
    const connectToChat = async ({userToken})=>{
         return  connect({username,agoraToken:userToken})
    }

    //get history messages from agora chat
    const handleGetHistory = ()=>{
        groups.forEach(group=>{
             getHistoryMsgs({groupId:group.groupid})
                 .then((msgs)=>dispatch(addHistoryMsg({messages:msgs?.messages,groupId:group.groupid})))
                 .catch(err=>console.log(err))
        })
    };

    //publish user status to agora chat
    const presentsStatus = ({status})=>{
        publishPresence({description:status}).then(res=>console.log('published',res)).catch(err=>console.log(err))
    }

    //get the group members from agora chat
    const Getmembers = ()=> {
        getGroupMember({groupId: centeredGroup.groupid}).then(({data}) => setGroupMembers(data))
            .catch(err => console.log(err))
    }
    const subscribeToPresence = ()=>{
        const members = groupMembers.map(member=>{
            if(member.member&&member.member!==username)
                return member.member
            else if(member.owner&&member.owner!==username)
                return member.owner
            else return null
        }).filter(member=>member!==null)
        subscribePresence({usernames:members}).then(res=>console.log('subscribed',res)).catch(err=>console.log(err))

    }

    const handleShuttle = ({isShuttled})=>{
        muteAllMembers({groupId:centeredGroup.groupid,shuttle:isShuttled}).then(res=>console.log('muted',res)).catch(err=>console.log(err))
    }






    //===================================================================================================





    console.log('rolename',roleName)
    console.log('members',groupMembers)
    console.log('users',users)
    console.log(userRole, first_name, id, access,username)
    console.log(groups, caseId)

    return(
        <ChatViewHen
            caseId={caseId}
            handleShuttle={handleShuttle}
            role={roleName}
            centerGroup={centeredGroup}
            category={caseCategory}
            caseTitle={caseTitle}
        />
    )

}
export default ChatPageHen