import '../styles/pages/chat_page.css'
import {useEffect, useState} from "react";
import Header from "../components/general/Header";
import ToolBar from "../components/general/ToolBar";
import GroupSwitch from "../components/general/GroupSwitch";
import UserPanel from "../components/general/UserPanel";
import useChat from "../hooks/useChat";
import  {useLocation} from "react-router-dom";
import MessageList from "../components/chat/MessageList";
import {useSelector} from "react-redux";
import { useRef } from 'react';
import {useLazyGetCaseSideQuery} from "../store";



const ChatViewHen = ({role, isOnline}) => {
    //hooks===================================================================================================
    const {groupListener, muteAllMembers,sendMsg, getGroupInfo,onlineStatusListener, getAnnouncement, publishPresence, removeEventById } = useChat()
    const location = useLocation()
    //state===================================================================================================
    const [size, setSize] = useState(window.innerHeight);
    const [isMuted,setIsMuted] = useState(false)
    const [connected,setConnected] = useState(false)
    const [isUsersListClick, setIsUsersListClick] = useState(false)
    const [isChatStart,setIsChatStart] = useState(false)
    const [typing, setTyping] = useState(false);
    //location&&store===================================================================================================
    const {groups} = location.state ?? []
    const {caseId} = location.state ?? ''
    const {activeGroup} = useSelector(state=>state.position)
    const {id,first_name,username} = useSelector(state=>state.user)
    //lazyApi===================================================================================================
    const [getGroupMember] =useLazyGetCaseSideQuery()
   
    //variables===================================================================================================
    const FOOTER_SIZE = 125 , HEADER_SIZE = 297.281-0.11298*window.innerHeight//Found by linear approximation
    const isMediator = role==='mediator'
    const centeredGroupId = groups.find(group=> group.groupname.endsWith('G'))?.groupid
    let isShuttled = activeGroup.slice(-1)==='G' && isMuted && role==='user' || (!isOnline) || !isChatStart&&role==='user'
    let typingTimeout;
    //refs===================================================================================================
     const userSide = useRef(isMediator ? 'M':'')
     const memberId = useRef('')
    //===================================================================================================
   
    useEffect(()=>{
        const isTyping = typing
        publishTypingStatus(isTyping)

    },[typing])

    useEffect(() => {
        return () =>{
            clearTimeout(typingTimeout); // Clear the timeout when the component unmounts
            removeEventById({id:'viewPageChat'})
            removeEventById({id:'viewPageChatConnection'})


        } 
      }, []);

    useEffect(()=>{
        onlineStatusListener({id:'viewPageChatConnection',handleConnection:connectionMsg=>setConnected(()=>connectionMsg === 'connected')})
        groupListener({handleGroupChange:groupEventsHandler, id:'viewPageChat'})
        window.addEventListener('resize', handleResize);
        getUserDetails()

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[])

    useEffect(()=>{
        if(!connected)return
        getGroupInfoFunc()
        getChatAnnouncment()

    },[connected])

    


    const getGroupInfoFunc = ()=>{
    getGroupInfo({groupId:centeredGroupId}).then(res=>{
        if(res?.data[0]?.mute===true)
            handleMuteGroup({operation:'muteAllMembers'})
    }).catch(err=>console.log(err))
    }

    const getChatAnnouncment = ()=>{
        const centeredGroupId = groups.find(group=>group.groupname.endsWith('G'))?.groupid
        getAnnouncement({groupId:centeredGroupId}).then(({data})=>{
            const {announcement} = data
         
            if(announcement==='chat_start')setIsChatStart(()=>true)
            else setIsChatStart(()=>false)
        })
    }
    

    const getUserDetails =async ()=>{
        if(isMediator)return ///please test that with user
        const {data, error} = await getGroupMember({caseId:caseId, user:id})
           if(error) {
               console.log('err')
               return
           }
           userSide.current = data.side
           if(!isMediator){
               memberId.current = data.id
           }
       }

    const handleMuteGroup = ({operation})=>{
        if(operation==='muteAllMembers')
              setIsMuted(()=>true)
        else if(operation==='unmuteAllMembers')
                setIsMuted(()=>false)
    }

    const groupEventsHandler = ({operation})=>{
        switch(operation){
            case 'muteAllMembers':
                setIsMuted(()=>true)
                break;
            case 'unmuteAllMembers':
                setIsMuted(()=>false)
                break;
            case 'updateAnnouncement':
                if(role==='user')
                    getChatAnnouncment()
                break;

                
        }

    }

    const publishTypingStatus = (typingStatus)=>{
        publishPresence({description:`${typingStatus?'typing':'stop_typing'}=${role==='mediator'?username:first_name}`})
    }

         const handleResize = () => {
        setSize(window.innerHeight);
         }

         const setInputHeight =(element, defaultHeight)=>{
            if(!element)return
            const target= element.target ? element.target : element;
            target.style.height=defaultHeight
            target.style.height=`${target.scrollHeight}px`
    }
    const setInputValue = ()=>{
        const msg = document.querySelector("#cp--input-tb").value;
        if(!msg || !isOnline)return
        handleSend(msg)
     
        document.querySelector("#cp--input-tb").value='';//Eventually clean the text box
    };

    const handleSend = (text)=>{ //handling the msg send and handle save the msg to data base using the useMsg hook
        const side = activeGroup.slice(-1)
        const groupId = groups.find(group=>group.groupname.endsWith(side))?.groupid
  
        const inputDetail = {msg:text,to:groupId,ext:{side:side,name:first_name,userId:id,sender:userSide.current}}
        sendMsg(inputDetail)
        
    };

    const handleSwitch =async ()=>{
        if(groups.length===0 || !isOnline)return
        muteAllMembers({groupId:centeredGroupId, shuttle:(!isMuted)})
        setIsMuted(prev=>!prev)
    }

    const handleInput = () => {
        clearTimeout(typingTimeout);
        setTyping(true);
        typingTimeout = setTimeout(() => {
          setTyping(false);
        }, 3500);
      };
    

      const shuttleMsgStyle={
        zIndex:isShuttled ? '1' : '-1',
        top:`${isShuttled? HEADER_SIZE: 0}px`,
        opacity: isShuttled ? '0.5' : '0',
     
    }



    return(
        <article
            className='page cp'
            style={{
                position:'relative',
                height:`${size}px`,
                display:'grid',
           
                gridTemplateRows:`${HEADER_SIZE}px 1fr ${FOOTER_SIZE}px`,
            }}>
                {isShuttled &&  <p className='cp--shuttled-msg' style={shuttleMsgStyle}>
               {'Shuttle mode activated, main chat is temporary unavailable.'} 
 
            </p>}
              

            <header className='cp--header'>
                <Header isLarge={false} unconnected={true} withoutLinks={true}/>
                <ToolBar
                   isInfo={isUsersListClick}
                />
                <GroupSwitch/>

            </header>

            <div>
            <MessageList
                maxHeight={`${size-FOOTER_SIZE-HEADER_SIZE}px`}
                isChatStart = {isChatStart}
                
            />
            </div>

            <footer className="cp--footer">
                <div className="cp--input">
                    <img 
                        onClick={()=>setIsUsersListClick(prev=>!prev)}
                        className='cp--btn'
                        src = "../../../assets/images/question_mark.svg"
                        alt="question mark"
                    />
                    <textarea
                        dir="auto"
                        onChange={event=>setInputHeight(event, '5px')}
                        className="cp--input-box"
                        id="cp--input-tb"
                        onInput={handleInput}
                    />

                    <button 
                        className={`cp--input-btn${isShuttled?'-shuttel':''}`} 
                        onClick={setInputValue} 
                        disabled={isShuttled}
                    >
                  
                    <img 
                        style={{margin:'0' }}
                        className='cp--btn'
                        src = "../../../assets/images/send.svg"
                        alt="send icon"
                    />
                    </button>
                </div>
                <UserPanel
                    handleSwitch={handleSwitch}
                    isSwitched={isMuted}
                />
            </footer>
        </article>
    )

}
export default ChatViewHen