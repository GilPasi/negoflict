import WebIM from "../WebIM";
import {useRef, useState} from "react";
import {useAddingManyUsersToOneChatGroupMutation} from "../store";

const useChat = ()=>{
    const [online,setOnline] = useState(false)
    const [addingUsersToGroup] = useAddingManyUsersToOneChatGroupMutation()
    const wasRendered = useRef(false)

    const connect = ({username,agoraToken})=>{
        if(wasRendered.current)return Promise.resolve()
        wasRendered.current = true
       return  WebIM.conn.open({
            user: username,
            agoraToken: agoraToken,
            error:err=>console.log('connection problem',err),
        })
    }
    const isConnected = ()=>{
        return WebIM.conn.isOpened()
    }

    const disconnect = ()=>{
        setOnline(false)
        WebIM.conn.close()
    }

    const sendMsg = ({ext,msg,to})=>{


        const option = {
            chatType:'groupChat',
                type:'txt',
                to:to,
                msg:msg,
                ext: {
                    name: ext?.name,
                    color: ext?.color,
                    side: ext?.side,
                    userId: ext?.userId,
                    sender: ext.sender,
                }
        }
        const message = WebIM.message.create(option)
       return  WebIM.conn.send(message).catch(err=>console.log('in sendMsg',err))
    }

    const removeEvents = ({handleWindowEvent})=>{
        WebIM.conn.removeEventHandler('Negoflict')
        window.removeEventListener('beforeunload', handleWindowEvent);
        window.removeEventListener('popstate', handleWindowEvent);
    }

    const muteAllMembers = ({groupId, shuttle})=>{
        if(shuttle)
          return   WebIM.conn.disableSendGroupMsg({groupId:groupId}).catch(err=>console.log('in muteAllMembers from disable',err))
        else
           return  WebIM.conn.enableSendGroupMsg({groupId: groupId}).catch(err=>console.log('in muteAllMembers from enable',err))
    }
    const getHistoryMsgs = ({groupId})=>{
        console.log('target===>>',groupId)

       return  WebIM.conn.getHistoryMessages({
            targetId:groupId,
            chatType: 'groupChat',
            pageSize:50,
        })
    }

    const addEvents = ({
                           handleWindowEvent,
                           handleMessage,
                           handlePresence,
                           handleConnected,
                           handleDisconnect,
                           handleGroupChange,
                           handleTokenWillExpire,
    })=>{
        WebIM.conn.addEventHandler('Negoflict',{
            onTextMessage:msg => handleMessage(msg),
            onPresence:presence=>handlePresence(presence),
            onConnected:()=>{
                setOnline(true)
                handleConnected()
            },
            onDisconnected:()=>handleDisconnect(),
            onError:err=>console.log('in addEvents',err),
            onGroupEvent:()=>handleGroupChange(),
            onTokenWillExpire:()=>handleTokenWillExpire(),
            onTokenExpired:()=>console.log('token expired'),

        })
        window.addEventListener('beforeunload', handleWindowEvent);
        window.addEventListener('popstate', handleWindowEvent);
    }

    const onlineStatusListener = ({id,handleConnection })=>{
        WebIM.conn.addEventHandler(id ??'onlineStatus', {
                onConnected:()=>{
                    setOnline(true)
                    handleConnection('connected')
                },
            onDisconnected:()=>{
                setOnline(false)
                handleConnection('disconnected')
            },
            onError:err=>console.log('in onlineStatusListener',err),

            })
    };
      const MsgListener = ({handleMessage})=>{
        WebIM.conn.addEventHandler('MSG',{
            onTextMessage:msg => handleMessage(msg),
        })
    }

    const groupListener = ({handleGroupChange})=>{
        WebIM.conn.addEventHandler('Group',{
            onGroupEvent:msg=>handleGroupChange(msg),
            onError:err=>console.log('in groupListener',err),
        })
    }

    const publishPresence = ({description})=>{
       return  WebIM.conn.publishPresence({description:description}).catch(err=>console.log('in publishPresence',err))
    };


    const setAnnouncement = ({groupId,isChatEnds})=>{

        const option = {
            groupId:groupId,
            announcement: isChatEnds?"chat_end":"chat_start"
        }
       return  WebIM.conn.updateGroupAnnouncement(option).catch(err=>console.log('in setAnnouncement',err))
    };

    const getAnnouncement = ({groupId})=>{

       return  WebIM.conn.fetchGroupAnnouncement({groupId}).catch(err=>console.log('in getAnnouncement',err))
    };


    const getGroupMember = ({groupId})=>{
        if(!online)return
       return  WebIM.conn.listGroupMembers({groupId:groupId, pageNum:1, pageSize:20}).catch(err=>console.log('in getGroupMember',err))
    }

    const getGroupInfo = ({groupId})=>{

       return  WebIM.conn.getGroupInfo({groupId:groupId}).catch(err=>console.log('in getOnlineUsers',err))
    }


    const getPresenceStatus = ({usernames})=>{
       return  WebIM.conn.getPresenceStatus({usernames}).catch(err=>console.log('in getPresenceStatus',err))
    }

    const subscribePresence = ({usernames})=>{

        if(usernames.length === 0)return Promise.resolve()
        return  WebIM.conn.subscribePresence({usernames:usernames, expiry:10000}).catch(err=>console.log('in subscribePresence',err))
    }

    const addUsersToGroup = ({group,users})=>{
      return addingUsersToGroup({users:users,group:group})

    }


    return{
        sendMsg,
        connect,
        disconnect,
        removeEvents,
        muteAllMembers,
        getHistoryMsgs,
        addEvents,
        publishPresence,
        setAnnouncement,
        getAnnouncement,
        getGroupMember,
        getGroupInfo,
        getPresenceStatus,
        groupListener,
        subscribePresence,
        online,
        onlineStatusListener,
        addUsersToGroup,
        MsgListener,
        isConnected







    }
}
export default useChat