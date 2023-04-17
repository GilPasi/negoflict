import WebIM from "../../WebIM";
import {useEffect, useMemo, useRef} from "react";
import {useGetChatTokenQuery} from "../../store";
import { useSelector } from "react-redux";
import { getPermName } from "../../utils/permissions";


const Chat = ({username, onConnect, onTextMsg, onHistory, groups,isShuttled, onMute, centerGroup})=>{
    //hooks=======
    const wasRenderd = useRef(false)
    const tokenRes = useGetChatTokenQuery({username:username})
    const {role} = useSelector(state=>state.user)
    const roleName  = getPermName({role:role})
    //===========
    //state==========
    const {first_name, last_name} = useSelector(state=>state.user)
    const messageDetail = useSelector(state=>state.message)

    const handleDisconnect = ()=>{
        if(!WebIM.conn.isOpened())return
        console.log(roleName)
        if(roleName ==='mediator')
            WebIM.conn.enableSendGroupMsg({groupId:centerGroup.groupid})

        WebIM.conn.close()
    }
   

    //useEffect=========
    useEffect(()=>{
        if(wasRenderd.current)return
        if(!tokenRes.isSuccess)return
        wasRenderd.current = true
        connect()      
    },[tokenRes]);

    useEffect(()=>{
      if(!messageDetail || messageDetail.msg==='')return
        postNewMessage()
    },[messageDetail]);

    useEffect(()=>{
        if(isShuttled===null)return
        if(!WebIM.conn.isOpened())return
        if(isShuttled)
            WebIM.conn.disableSendGroupMsg({groupId:centerGroup.groupid})
        else
            WebIM.conn.enableSendGroupMsg({groupId:centerGroup.groupid})
            .then(res=>console.log('enable>>>>>',res))
    },[isShuttled])
    //=========== 

    //listeners==========
    WebIM.conn.listen({
        onClosed: ()=>onConnect(false),
        onOpened: ()=>{
            onConnect(true)
            getHistoryMsg()
            },
        onTextMessage: msg=>onTextMsg(msg),
       
    });

    WebIM.conn.addEventHandler('hen',{
        onGroupEvent: msg=>handleGroupEvent(msg),
        onOnline: (res)=>console.log('connected',res),
        onConnected: ()=>handleConnectionMsg('connect'),
        onDisconnected:()=>handleConnectionMsg('disconnect')
    })
    window.addEventListener('popstate',handleDisconnect)
    
    //====================

    //function========
    const connect =async ()=>{
        await WebIM.conn.open({
            user:username,
            agoraToken: tokenRes.data.userToken
        }) 
        getHistoryMsg()   
    };

    const postNewMessage = ()=>{
        const {ext,msg,to} = messageDetail

        const option = {
            chatType:'groupChat',
                type:'txt',
                to:to,
                msg:msg,
                ext:{
                    name:ext?.name,
                    color:ext?.color,
                    side:ext?.side,
                    userId:ext?.userId,
                    sender:ext.sender,
                }
        }
        const message = WebIM.message.create(option)
        WebIM.conn.send(message)
    };
    const getHistoryMsg = ()=>{
        console.log('in fetch history')
        groups.forEach(group=>{
             WebIM.conn.getHistoryMessages({targetId:group.groupid ,chatType:'groupChat', pageSize: 50})
             .then(res=>{
                if(res.cursor==='undefined')return
                onHistory(res,group.groupid)})
        });
    }
    const handleGroupEvent = (msg)=>{
        const {operation} = msg
        switch(operation){
            case 'muteAllMembers':
                onMute(true)
                break
            case 'unmuteAllMembers': 
                onMute(false)
                break

            default:
                break
        }

    }
    const handleConnectionMsg = (connectionType)=>{
        const option = {
            chatType:'groupChat',
                type:'txt',
                to:centerGroup,
                msg:'connectionChatAgora',
                ext:{
                    name:`${first_name} ${last_name}`,
                    action:connectionType
                }
        }
        const message = WebIM.message.create(option)
        WebIM.conn.send(message)
    }

export default Chat

