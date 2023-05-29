import '../styles/pages/chat_page.css'
import {useEffect, useState} from "react";
import Header from "../components/general/Header";
import ToolBar from "../components/general/ToolBar";
import GroupSwitch from "../components/general/GroupSwitch";
import UserPanel from "../components/general/UserPanel";
import useChat from "../hooks/useChat";
import  {useLocation} from "react-router-dom";
import MessageList from "../components/chat/MessageList";


const ChatViewHen = ({

                         role,
                         isOnline,


                     }) => {
    //hooks===================================================================================================
    const {groupListener, muteAllMembers, onlineStatusListener} = useChat()
    const location = useLocation()
    //===================================================================================================
    //state===================================================================================================
    const [size, setSize] = useState(window.innerHeight);
    const [isMuted,setIsMuted] = useState(false)
    const {groups} = location.state ?? []

    //===================================================================================================

    //variables===================================================================================================
    const FOOTER_SIZE = 125 , HEADER_SIZE = 297.281-0.11298*window.innerHeight//Found by linear approximation
    const isMediator = role==='mediator'
    const centeredGroupId = groups.find(group=> group.groupname.endsWith('G'))?.groupid
    //===================================================================================================
    
    useEffect(()=>{
        groupListener({handleGroupChange:handleMuteGroup})

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[])

    const handleMuteGroup = ({operation})=>{
        console.log('in view',operation)
        if(operation==='muteAllMembers')
            return  setIsMuted(()=>true)
        else if(operation==='unmuteAllMembers')
            return setIsMuted(()=>false)
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
       console.log(msg)
        document.querySelector("#cp--input-tb").value='';//Eventually clean the text box

    }

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
            <MessageList/>

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

                            <button className={`cp--input-btn${isMuted&&!isMediator?'-shuttel':''}`} onClick={setInputValue} disabled={isMuted}>
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