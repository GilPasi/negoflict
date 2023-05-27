import WebIM from "../WebIM";
import {useState} from "react";



const useChat = ()=>{
    const [online,setOnline] = useState(false)

    const connect = ({username,agoraToken})=>{
        if(online)return
       return  WebIM.conn.open({
            user: username,
            agoraToken: agoraToken,
            error:err=>console.log('connection problem',err),
        })
    }

    const disconnect = ()=>{
        if(!online)return
        setOnline(false)
        WebIM.conn.close()
    }

    const sendMsg = ({ext,msg,to})=>{
        if(!online)return

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
        WebIM.conn.send(message).catch(err=>console.log('in sendMsg',err))
    }

    const removeEvents = ({handleWindowEvent})=>{
        WebIM.conn.removeEventHandler('Negoflict')
        window.removeEventListener('beforeunload', handleWindowEvent);
        window.removeEventListener('popstate', handleWindowEvent);
    }

    const muteAllMembers = ({groupId, shuttle})=>{
        if(!online)return
        if(shuttle)
          return   WebIM.conn.disableSendGroupMsg(groupId).catch(err=>console.log('in muteAllMembers from disable',err))
        else
           return  WebIM.conn.enableSendGroupMsg(groupId).catch(err=>console.log('in muteAllMembers from enable',err))
    }

    const getHistoryMsgs = ({groupId})=>{
        if(!online)return
       return  WebIM.conn.getHistoryMessages({
            targetId: groupId,
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

    const onlineStatusListener = ({handleConnection })=>{
        WebIM.conn.addEventHandler('onlineStatus', {
                onConnected:()=>{
                    setOnline(true)
                    handleConnection('connected')
                },
            onDisconnected:()=>{
                setOnline(false)
                handleConnection('disconnected')
            },

            })
    };

    const groupListener = ({handleGroupChange})=>{
        WebIM.conn.addEventHandler('Group',{
            onGroupEvent:()=>handleGroupChange(),
        })
    }




    const publishPresence = ({description})=>{
        if(!online)return
       return  WebIM.conn.publishPresence({description:description}).catch(err=>console.log('in publishPresence',err))
    }


    const setAnnouncement = ({groupId,shuttle})=>{
        if(!online)return
        const option = {
            groupId:groupId,
            announcement: "chat_start"
        }
       return  WebIM.conn.updateGroupAnnouncement(option).catch(err=>console.log('in setAnnouncement',err))
    }

    const getAnnouncement = ({groupId})=>{
        if(!online)return
       return  WebIM.conn.fetchGroupAnnouncement({groupId}).catch(err=>console.log('in getAnnouncement',err))
    }


    const getGroupMember = ({groupId})=>{
        if(!online)return
       return  WebIM.conn.listGroupMembers({groupId:groupId, pageNum:1, pageSize:20}).catch(err=>console.log('in getGroupMember',err))
    }

    const getGroupInfo = ({groupId})=>{
        if(!online)return
       return  WebIM.conn.getGroupInfo({groupId:groupId}).catch(err=>console.log('in getOnlineUsers',err))
    }


    const getPresenceStatus = ({usernames})=>{
        if(!online)return
       return  WebIM.conn.getPresenceStatus({usernames})
    }

    const subscribePresence = ({usernames})=>{
        if(!online)return
        return  WebIM.conn.subscribePresence({usernames:usernames, expiry:10000})
    }

    const addUsersToGroup = ({groupId,usernames})=>{
        // if(!online)return
        return  WebIM.conn.inviteUsersToGroup({groupId:groupId,users:usernames})
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






    }
}
export default useChat