import WebIM from "../../WebIM";
import {useEffect, useRef} from "react";
import {clearMsg, resetChatState, useGetChatTokenQuery} from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { getPermName } from "../../utils/permissions";
import { useGetFullUsersByCaseQuery, addPerticipents,setOnlineUsers,setUserAttribute,clearAllPerticipents, useLazyGetMyMediatorQuery,setStartChat } from "../../store";




const Chat = ({username, onConnect, onTextMsg, onHistory, groups,isShuttled, onMute, centerGroup, handleProgress, caseId})=>{
    //hooks=======
    const wasRenderd = useRef(false)
    const mauted = useRef(false)
    const tokenRes = useGetChatTokenQuery({username:username})
    const {role} = useSelector(state=>state.user)
    const roleName  = getPermName({role:role})
    const {data:groupParticipentsData, error:groupParticipentsError, refetch:refetchGetGroupParticipent} = useGetFullUsersByCaseQuery({caseId:caseId})
    const dispatch = useDispatch()
    const [getMediator] = useLazyGetMyMediatorQuery()
   
    //===========
    //state==========
    const messageDetail = useSelector(state=>state.message)

    const handleDisconnect =async (event)=>{
        event.preventDefault()
        event.returnValue = ''

        if(!WebIM.conn.isOpened())return
        wasRenderd.current = false
        if(roleName ==='mediator')
            WebIM.conn.enableSendGroupMsg({groupId:centerGroup.groupid})
        dispatch(clearMsg())
        dispatch(resetChatState())
        dispatch(clearAllPerticipents())
        await WebIM.conn.publishPresence({description:'offline'})
        .catch(err=>console.log(err))
        dispatch(setStartChat(false))

        await WebIM.conn.close()
    }
   

    //useEffect=========
    useEffect(()=>{
        
        if(groupParticipentsError){
            return
        }
        else if(!groupParticipentsData || groupParticipentsData.length == 0)return
        if(mauted.current)return
        mauted.current = true
        const perticipentArr = []

        if(roleName === 'user'){
            const { mediator } = groupParticipentsData[0]
            getMediator({mediatorId:mediator}).then(res=>{
                const {first_name,last_name, username } = res.data.user
               const modMediator = {side:'M', fullName:`${first_name} ${last_name}`,connect:false, agoraUsername:username}
               dispatch(addPerticipents([modMediator]))
            })
        }        
  
        

        groupParticipentsData.forEach(pert=>{
            const agoraUsername = pert.user.email.replace(/[^\w\s]/gi, '')
            const userMod = {side:pert.side, fullName:`${pert.user.first_name} ${pert.user.last_name}`,connect:false, agoraUsername:agoraUsername}
            perticipentArr.push(userMod)
        })

       

        dispatch(addPerticipents(perticipentArr))
    },[groupParticipentsData,groupParticipentsError])

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
            .catch(err=>console.log(err))
        else
            WebIM.conn.enableSendGroupMsg({groupId:centerGroup.groupid})
            .catch(err=>console.log(err))
            
    },[isShuttled])
    //=========== 

    //listeners==========
    WebIM.conn.listen({
        onClosed: ()=>onConnect(false),
        onOpened: ()=>{
            handleProgress('connecting', 10)
            onConnect(true)
            getHistoryMsg()
            getGroupsInfo()
            if(roleName==='mediator')
                handleChatStart()
            else
                getiStartChat()


            },
        onTextMessage: msg=>onTextMsg(msg),
       
    });

    const handleChatStart = ()=>{
        dispatch(setStartChat(true))
        let option = {
            groupId: centerGroup.groupid,   
            announcement: "chat_start"                       
        };
        WebIM.conn.updateGroupAnnouncement(option).then(res => console.log(res))
    }
    // useEffect(()=>{
    //     if(usersAtribute.length == 0)return
    //     const persOnline = usersAtribute.filter(item=>item.ext === 'online')

    const getiStartChat = ()=>{
        let option = {
            groupId: centerGroup.groupid,
        };
        WebIM.conn.fetchGroupAnnouncement(option).then(res => {
            console.log('groupaNNONCE',res)
            if(res.data.announcement==='chat_start')
                dispatch(setStartChat(true))
            else if(res.data.announcement==='chat_end')
                dispatch(setStartChat(false))
    })

    }

        

    // },[usersAtribute,perticipentArray])

    

    WebIM.conn.addEventHandler('hen',{
        onGroupEvent: msg=>handleGroupEvent(msg),
        onOnline: (res)=>{
            handleProgress('fetching messages', 30)
            console.log('connected',res)
        },
        onPresenceStatusChange: res=>setParticipentsChange(res),
        onError:err=>console.log('error',err),
        
        
        // onConnected: ()=>{
        //     onConnect(true)
        //     getHistoryMsg()
        //     },
        // onDisconnected:()=>handleConnectionMsg('disconnect')
    })
    window.addEventListener('popstate',handleDisconnect)
    window.addEventListener('beforeunload',handleDisconnect)
    
    //====================

    //function========
    const setParticipentsChange = (changes)=>{
        changes.forEach(change=>{
            dispatch(setUserAttribute(change))
        })
      
    }
    const connect =async ()=>{
        await WebIM.conn.open({
            user:username,
            agoraToken: tokenRes.data.userToken
        }).catch(err=>console.log(err))
        
        // getHistoryMsg() 
        // getGroupsInfo()  
    };

    const getGroupsInfo=async()=>{

       await groups.forEach(group=>{
            WebIM.conn.getGroupInfo({groupId:group.groupid}).then(res=>{
                const members = []
                res.data[0].affiliations.forEach(user=>{
             
                    const member = user?.member ?? user.owner
                    if(member&& member !== username)
                        members.push(member)
                })
                return members

            }).then(members=>{
                WebIM.conn.subscribePresence({usernames:members,expiry:100000})
                .then(()=>{
                    WebIM.conn.getPresenceStatus({usernames:members}).then(res=>{
                        if(res){
                            const onlineUsers = res.result.filter(item=>item.ext === 'online')
                            dispatch(setOnlineUsers(onlineUsers))
                        }
                    })
                })
            }).then(()=>{
                // setTimeout(()=>{
                    WebIM.conn.publishPresence({description:'online'})
                    .catch(err=>console.log(err))
                    handleProgress('connecting', 20)
        
                // },500)

            })
            .catch(err=>console.log(err))
        })

       
       
    }

    const postNewMessage =async ()=>{
        if(!await WebIM.conn.isOpened())return
        
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
    const getHistoryMsg =async ()=>{
      
      await groups.forEach(group=>{
             WebIM.conn.getHistoryMessages({targetId:group.groupid ,chatType:'groupChat', pageSize: 50})
             .then(res=>{
                if(res.cursor==='undefined')return
                onHistory(res,group.groupid)}).then(()=>{
                    handleProgress('fetching',10);
                })
                .catch(err=>console.log(err))
        })
        handleProgress('ending',30)

    }

    const handleGroupEvent = (msg)=>{
        console.log('groupEvent>>>>>>',msg)
        
        const {operation} = msg
        switch(operation){
            case 'muteAllMembers':
                onMute(true)
                break;
            case 'unmuteAllMembers': 
                onMute(false)
                break;
            case 'updateAnnouncement':
                if(roleName!=='mediator')
                    getiStartChat()
                break;

            default:
                break
        }

    }
    
    // const handleConnectionMsg = (connectionType)=>{
    //     const option = {
    //         chatType:'groupChat',
    //             type:'txt',
    //             to:centerGroup.groupid,
    //             msg:'connectionChatAgora',
    //             ext:{
    //                 name:`${first_name} ${last_name}`,
    //                 action:connectionType
    //             }
    //     }
    //     const message = WebIM.message.create(option)
    //     WebIM.conn.send(message)
    // }
}

export default Chat

