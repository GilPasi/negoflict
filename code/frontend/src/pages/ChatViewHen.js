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


const ChatViewHen = ({

                         role,
                         isOnline,
                       
                         


                     }) => {
    //hooks===================================================================================================
    const {groupListener, muteAllMembers,sendMsg, getGroupInfo,onlineStatusListener } = useChat()
    const location = useLocation()


    //===================================================================================================
    //state===================================================================================================
    const [size, setSize] = useState(window.innerHeight);
    const [isMuted,setIsMuted] = useState(false)
    const {groups} = location.state ?? []
    const {caseId} = location.state ?? ''
    const {activeGroup} = useSelector(state=>state.position)
    const {id,first_name} = useSelector(state=>state.user)
    let isShuttled = activeGroup.slice(-1)==='G' && isMuted && role==='user'
    const [connected,setConnected] = useState(false)

    
    //===================================================================================================
    //lazyApi===================================================================================================
    const [getGroupMember] =useLazyGetCaseSideQuery()
    //===================================================================================================
    //variables===================================================================================================
    const FOOTER_SIZE = 125 , HEADER_SIZE = 297.281-0.11298*window.innerHeight//Found by linear approximation
    const isMediator = role==='mediator'
    const centeredGroupId = groups.find(group=> group.groupname.endsWith('G'))?.groupid
    const userSide = useRef(isMediator ? 'M':'')
    const memberId = useRef('')
    //===================================================================================================
 

    useEffect(()=>{
        onlineStatusListener({id:'viewPageChatConnection',handleConnection:connectionMsg=>setConnected(()=>connectionMsg === 'connected')})
        groupListener({handleGroupChange:handleMuteGroup, id:'viewPageChat'})
        window.addEventListener('resize', handleResize);
        getUserDetails()

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[])

    useEffect(()=>{
        if(!connected)return
        getGroupInfoFunc()

    },[connected])

    const getGroupInfoFunc = ()=>{
    getGroupInfo({groupId:centeredGroupId}).then(res=>{
        console.log('info group',res)
        if(res?.data[0]?.mute===true)
            handleMuteGroup({operation:'muteAllMembers'})
    }).catch(err=>console.log(err))
       
    }

    const getUserDetails =async ()=>{
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


    return(
        <article
            className='page cp'
            style={{
                position:'relative',
                height:`${size}px`,
                // width:'100vh',
                display:'grid',
                backgroundColor:'red',
                gridTemplateRows:`${HEADER_SIZE}px 1fr ${FOOTER_SIZE}px`,
            }}>

            <header className='cp--header'>
                <Header isLarge={false} unconnected={true} withoutLinks={true}/>
                <ToolBar
                    isChat={true}
                />
                <GroupSwitch/>

            </header>

            <div>
            <MessageList
                maxHeight={`${size-FOOTER_SIZE-HEADER_SIZE}px`}
                
            />

            </div>

            <footer className="cp--footer">
                    <div className="cp--input">
                        <span className="material-symbols-outlined cp--help">
                            help
                        </span>
                        <textarea
                            dir="auto"
                            onChange={event=>setInputHeight(event, '5px')}
                            className="cp--input-box"
                            id="cp--input-tb"
                        />

                            <button className={`cp--input-btn${isShuttled?'-shuttel':''}`} onClick={setInputValue} disabled={isShuttled}>
                                <span className="material-symbols-outlined cp--send" >
                                    send
                                </span>
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