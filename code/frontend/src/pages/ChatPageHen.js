import useChat from "../hooks/useChat";
import {useEffect, useRef, useState} from "react";
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
    const { connect, getHistoryMsgs, publishPresence, onlineStatusListener, getGroupMember, groupListener, subscribePresence,muteAllMembers, getGroupInfo} = useChat()
    const dispatch = useDispatch()
    //===================================================================================================
    //state=========
    let groups = location.state?.groups ?? [] //holds the 3 sides of the chat groups by agora
    const {caseId, caseTitle,caseCategory} = location.state ?? '' //holds the case id
    const {username, role:userRole, first_name, id, access} = useSelector(state=>state.user) //user important data
    const [connected,setConnected] = useState(false) //holds the connection status
    const [groupMembers,setGroupMembers] = useState([]) //holds the group members agora data
    //===================================================================================================
    //variables=========

    const roleName = getPermName({role:userRole}) //user role name 'mediator'/user
    const userAgoraName =  roleName==='user'? username.replace(/[^\w\s]/gi, ''): username//user agora name
    const centeredGroup = groups.find(group => group.groupname.endsWith('G')); //holds the center group agora data
    //===================================================================================================
    //apiFetch==========
    const {data:token} = useGetChatTokenQuery({username:userAgoraName}) //get the agora token
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
            .catch(err=>console.log('coonnnnn',err))


    },[token]);

    //get history and members after connection to agora chat
    //and publish user status
    //and get the users data from agora
    useEffect(()=>{
        if(!connected || !groups)return
        presentsStatus({status:'online'})
        handleGetHistory()
        Getmembers()
        getGroupInfoFunc()
    },[connected,groups]);
    
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
        groupListener({handleGroupChange})
    }

    const handleGroupChange =async (change)=>{
        const {operation} = change

        switch (operation) {
            case 'inviteToJoin':
             // const res = await acceptInviteFromGroup({gropId:change.id, invitee:userAgoraName})
                console.log('invite',change)
                return;


            default:return
        }
    }

    //connect to agora chat
    const connectToChat =  ({userToken})=>{
         return  connect({username:userAgoraName,agoraToken:userToken})
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
    console.log('groupMembers',groupMembers)
    const subscribeToPresence = ()=>{
        const members = groupMembers.map(member=>{
            if(member.member&&member.member!==username)
                return member.member
            else if(member.owner&&member.owner!==username)
                return member.owner
            else return null
        }).filter(member=>member!==null)
        if(members.length===0) return
        subscribePresence({usernames:members}).then(res=>console.log('subscribed',res)).catch(err=>console.log(err))
    }
    

    const handleShuttle = ({isShuttled})=>{
        muteAllMembers({groupId:centeredGroup.groupid,shuttle:isShuttled}).then(res=>console.log('muted',res)).catch(err=>console.log(err))
    }

    const getGroupInfoFunc = ()=>{
        groups.forEach(group=>{
                getGroupInfo({groupId:group.groupid}).then(res=>console.log('group info',res)).catch(err=>console.log(err))

        })
    }
    console.log('connnect',connected)







    //===================================================================================================





    console.log('rolename',roleName)
    console.log('members',groupMembers)
    console.log('users',users)
    console.log(userRole, first_name, id, access,username)
    console.log(groups, caseId)

    return(
        <ChatViewHen
            isOnline={connected}
            role={roleName}

        />
    )

}
export default ChatPageHen