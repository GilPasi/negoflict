import useChat from "../hooks/useChat";
import {useEffect, useState} from "react";
import { useLocation} from "react-router-dom";
import {  useSelector } from "react-redux";
import {useGetChatTokenQuery,setMediatorName} from "../store";
import { getPermName } from "../utils/permissions";
import ChatViewHen from "./ChatViewHen";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


const ChatPageHen = ()=>{
    //hooks==========
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { connect, publishPresence, onlineStatusListener, tokenWillExpireListener, renewToken, setAnnouncement, disconnect, windowListener, subscribePresence, getGroupMember} = useChat()
    //===================================================================================================
    //state=========
    let groups = location.state?.groups ?? [] //holds the 3 sides of the chat groups by agora
    const {username, role:userRole,first_name} = useSelector(state=>state.user) //user important data
    const [connected,setConnected] = useState(false) //holds the connection status
    //===================================================================================================
    //variables=========

    const roleName = getPermName({role:userRole}) //user role name 'mediator'/user
    const userAgoraName =  roleName==='user'? username.replace(/[^\w\s]/gi, ''): username//user agora name
    const centeredGroup = groups.find(group => group.groupname.endsWith('G')) //holds the center group agora data
    //===================================================================================================
    //apiFetch==========
    const {data:token, refetch:refetchToken} = useGetChatTokenQuery({username:userAgoraName}) //get the agora token
    //===================================================================================================
    
    //useEffect==========
    //connect to agora chat and add listeners
    useEffect(  ()=>{
        if(!token) return
        const {userToken} = token
        if(!userToken) return
        connectToChat({userToken})
            .then(()=> {

                addConnectionListeners()
                addTokenLister()
                addWindowListener()
            })
            .catch(err=>console.log('coonnnnn',err))


    },[token]);

    useEffect(()=>{
        if(!connected || !groups)return
        presentsStatus({status:'online'})
        if(roleName==='mediator')
            setStartChat()
        
            getMembers()
      
       
    },[connected,groups]);
 
    //===================================================================================================

    //functions============
    //add listeners to connection status if connected or disconnected
    const addConnectionListeners = ()=>{
        onlineStatusListener(
            {handleConnection:connectionMsg=>setConnected(()=>connectionMsg === 'connected')})
    }
    const addTokenLister = ()=>{
        tokenWillExpireListener({id:'ChatPageHen',tokenExpiredHandler:handleTokenExpired,tokenWillExpiredHandler:handleTokenWillExpired})

    }

    const setStartChat = ()=>{
        setAnnouncement({groupId:centeredGroup.groupid, isChatEnds:false})
    }

    const addWindowListener = ()=>{
        windowListener({handleBackEvent:handleBackEvent})
    }

    const handleBackEvent =async (event)=>{
        event.preventDefault()
    await presentsStatus({status:'offline'}).then(async()=> await disconnect())
    }

    const getMembers = ()=>{
        getGroupMember({groupId:centeredGroup.groupid}).then(({data})=>{
            const myName = roleName==='user'? username.replace(/[^\w\s]/gi, ''): username
            const members = []

            data.forEach(member => {
                const memberName = member?.member ?? member?.owner
                console.log('henhenhenhenhenhen>>>>>>>>',member)
                console.log('henhenhenhenhenhen>>>>>>>>',Object.keys(member))
                if (Object.keys(member)[0] === 'owner' && roleName==='user')
                    dispatch(setMediatorName(memberName))
                if(memberName!==myName)
                    members.push(Object.values(member))
            });
            
            return members.flat()
           
  
        }).then(members=>subscribePresence({usernames:members}))
    }

   


    const handleTokenWillExpired = ()=>{
        refetchToken()
            .then(res=>{
                const {userToken} = res.data
                renewToken({token:userToken})
            })
    }

    const handleTokenExpired = ()=>{
        console.error('token expired')
        navigate('/login',{replace:true})
    }


    //connect to agora chat
    const connectToChat =  ({userToken})=>{
         return  connect({username:userAgoraName,agoraToken:userToken})
    }

    //publish user status to agora chat
    const presentsStatus = ({status})=>{
       return publishPresence({description:`${status}=${roleName==='mediator'?username:first_name}`}).then(res=>console.log('published',res)).catch(err=>console.log(err))
    }


    //===================================================================================================



    return(
        <ChatViewHen
            isOnline={connected}
            role={roleName}

        />
    )

}
export default ChatPageHen