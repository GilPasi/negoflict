import WebIM from "../../WebIM";
import {useEffect, useRef} from "react";
import {clearMsg, resetChatState, useGetChatTokenQuery} from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { getPermName } from "../../utils/permissions";
import { useGetFullUsersByCaseQuery, addPerticipents,setOnlineUsers,setUserAttribute,clearAllPerticipents, useLazyGetMyMediatorQuery,setStartChat,removeParticepentByAgoraName } from "../../store";
import { useNavigate } from "react-router-dom";




const Chat = ({username, onConnect, onTextMsg, onHistory, groups,isShuttled, onMute, centerGroup, handleProgress, caseId})=>{
    //hooks=======
    const wasRenderd = useRef(false)
    const mauted = useRef(false)
    const tokenRes = useGetChatTokenQuery({username:username})
    const {role} = useSelector(state=>state.user)
    const roleName  = getPermName({role:role})
    const {data:groupParticipentsData, error:groupParticipentsError} = useGetFullUsersByCaseQuery({caseId:caseId})
    const dispatch = useDispatch()
    const [getMediator] = useLazyGetMyMediatorQuery()
    const navigate = useNavigate()
    const hasKicked = useRef(null);
    var kikOutTimeout;
    const isOpened = useRef(false)
    
   
    //===========
    //state==========
    const messageDetail = useSelector(state=>state.message)

    //functions===================
    const handleDisconnect =async ()=>{
        console.log(isOpened.current)
        if(!isOpened.current)return
        wasRenderd.current = false
        window.removeEventListener('beforeunload', handleDisconnect);
        window.removeEventListener('popstate', handleDisconnect);
        WebIM.conn.removeEventHandler('negoflict')
        if(roleName ==='mediator')
           await WebIM.conn.enableSendGroupMsg({groupId:centerGroup.groupid})
        await WebIM.conn.publishPresence({description:'offline'})
        dispatch(clearMsg())
        dispatch(resetChatState())
        dispatch(clearAllPerticipents())
        dispatch(setStartChat(false))

        await WebIM.conn.close()
    };
    const addEvents = ()=>{
      WebIM.conn.addEventHandler('hen',{
        onGroupEvent: msg=>handleGroupEvent(msg),
        onConnected: (res)=>{
            handleProgress('fetching messages', 30)
            onConnect(true)
            getHistoryMsg()
            getGroupsInfo()
            if(roleName==='mediator')
                handleChatStart()
            else
                getiStartChat()

        },
        onPresenceStatusChange: res=>setParticipentsChange(res),
        onError:err=>console.log('error',err),
        onDisconnected:()=>onConnect(false),
        onTextMessage:msg=>onTextMsg(msg)

    })
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
     const connect =async ()=>{
         await WebIM.conn.open({
            user:username,
            agoraToken: tokenRes?.data?.userToken
        })

        isOpened.current = true
    };
        const postNewMessage =async ()=>{
        if(!isOpened)return

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
            WebIM.conn.send(message).then(()=> dispatch(clearMsg()))
        };

        const handleChatStart = ()=>{
        let option = {
            groupId: centerGroup.groupid,
            announcement: "chat_start"
        };
        WebIM.conn.updateGroupAnnouncement(option).then(res =>dispatch(setStartChat(true)))
    };
        const getiStartChat = ()=>{
            let option = {
                groupId: centerGroup.groupid,
            };

            WebIM.conn.fetchGroupAnnouncement(option).then(res => {
                if(res.data.announcement==='chat_start')
                    dispatch(setStartChat(true))
                else if(res.data.announcement==='chat_end')
                    dispatch(setStartChat(false))
        })};

         const setParticipentsChange = (changes)=>{
        changes.forEach(change=>{
            dispatch(setUserAttribute(change))
        })

    }

    //useEffects==============
    useEffect(()=>{
        if(wasRenderd.current)return
        if(!tokenRes.isSuccess)return
        wasRenderd.current = true
        connect()
        addEvents()
        window.addEventListener('popstate',handleDisconnect)
        window.addEventListener('beforeunload',handleDisconnect)
    },[tokenRes]);

    useEffect(()=>{
        if(groupParticipentsError){
            handleProgress('fetching',20)
            return
        }
        else if(!groupParticipentsData || groupParticipentsData.length === 0)return
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
            const userMod = {id:pert.user.id,side:pert.side, fullName:`${pert.user.first_name} ${pert.user.last_name}`,connect:false, agoraUsername:agoraUsername}
            perticipentArr.push(userMod)
        })

        dispatch(addPerticipents(perticipentArr))
    },[groupParticipentsData,groupParticipentsError]);

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
    //==================



    //function 2========
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
            case 'destroy':
                if(msg.id===centerGroup.groupid)
                    handleKikOut()
                break;
                
            case 'memberAbsence':
                if(roleName!=='mediator')
                    handleRemoveFromList(msg.from)
                break;

            case 'removeMember':
                kikOutTimeout = setTimeout(() => {
                    handleKikOut();
                  }, 5000);
                break;
            case 'directJoined':
                hasKicked.current = false
                clearTimeout(kikOutTimeout);
                
                break;
            default:
                break
        }
    }
    const handleRemoveFromList = (agora_name)=>{
        dispatch(removeParticepentByAgoraName(agora_name))
    }

    const handleKikOut = () => {
        if(hasKicked.current===false){
            hasKicked.current = true
            return
        }
      
          handleDisconnect();
      
          navigate("/user/survey_page", {
            replace: true,
            state: {
              caseId: caseId.slice(-7),
            },
          });
      };




}

export default Chat



