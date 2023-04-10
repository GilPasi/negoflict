import WebIM from "../../WebIM";
import {useEffect, useRef, useState} from "react";
import {useGetChatTokenQuery} from "../../store";
import { useSelector } from "react-redux";


const Chat = ({username, onConnect, onTextMsg, onHistory, groups,inputText})=>{
    //hooks=======
    const wasRenderd = useRef(false)
    const tokenRes = useGetChatTokenQuery({username:username})
    //===========

    //state==========
    const [msgSend,setMsgSend] = useState(inputText)
    const messageDetail = useSelector(state=>state.message)

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
    //====================

    //function========
    const connect =async ()=>{
        console.log('in connect',username)
        await WebIM.conn.open({
            user:username,
            agoraToken: tokenRes.data.userToken
        }) 
        getHistoryMsg()   
    };

    const postNewMessage = ()=>{
        console.log('in post message')
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

}

export default Chat

