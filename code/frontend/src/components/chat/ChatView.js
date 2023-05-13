import '../../styles/pages/chat_page.css'
import Header from '../general/Header'
import GroupSwitch from '../general/GroupSwitch'
import MessageList from './MessageList'
import UserPanel from '../general/UserPanel'
import ToolBar from '../general/ToolBar'
import Button from '../general/Button'

import { useState, useEffect} from 'react';
import { useSelector } from 'react-redux'



const ChatView = ({
    isMediator, caseId,activeGroup,
    handleSend, handleShuttle, isShuttled,
     role, muted,centerGroup,
     loadingData,groups,notifications,
     closeNotification})=>{

    const [size, setSize] = useState(window.innerHeight);
    const [usersListClick, setUsersListClick] = useState(false)
    const { startChat } = useSelector(state=>state.chat_attrbute.mediator)
    
 
    const shuttelView = !(startChat) || muted
    &&
    role==='user'
    &&
    activeGroup.slice(-1)==='G'
    ?'-shuttel':'' 
    

    useEffect(() => {
 
      function handleResize() {
        setSize(window.innerHeight);
      }
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    
    const FOOTER_SIZE = 125 , HEADER_SIZE = 297.281-0.11298*window.innerHeight//Found by linear approximation
    

    const setInputHeight =(element, defaultHeight)=>{
        if(element){
            const target= element.target ? element.target : element;
            target.style.height=defaultHeight
            target.style.height=`${target.scrollHeight}px`

        }  
    }
    const setInputValue = ()=>{
        const msg = document.querySelector("#cp--input-tb").value;

        if(!msg)return
        handleSend(msg)

        document.querySelector("#cp--input-tb").value='';//Eventually clean the text box

    }
    const showShuttleMsg = shuttelView==='-shuttel' && startChat

    
    const shuttleMsgStyle={
        zIndex:showShuttleMsg ? '1' : '-1',
        top:`${showShuttleMsg? HEADER_SIZE: 0}px`,
        opacity: showShuttleMsg ? '0.5' : '0',
    }

    const handleRemove = ()=>{
        //Remove logic : HEN

        document.querySelector(".cp--user-info").close()
    }
    

    return(
        <article 
            className="page cp" 
            style={{ 
                position:'relative',
                height: `${size}px`,
                display: 'grid',
                //The header and the footer has fixed sizes , the message-list 
                //will take the rest of the available space = 1fr
                gridTemplateRows:`${HEADER_SIZE}px 1fr ${FOOTER_SIZE}px`,
            }}>
            <dialog className="cp--user-info">

                <h1>User data ...</h1>
               <Button
                    onClick={()=>document.querySelector(".cp--user-info").close()}
                    text="cancel"
                    altitude="2em"
                    length="5em"
                    margin="5px"
                />
                <Button
                    onClick={handleRemove}
                    text="remove"
                    altitude="2em"
                    length="5em"
                />
            </dialog> 
            
            <p className='cp--shuttled-msg' style={shuttleMsgStyle}>
               {isMediator?'Shuttle mode activated, main chat is temporary unavailable.' : 
               'Shuttle mode is active, users can only send you private messages'}
            </p>
                <header className='cp--header'>
                    <Header isLarge={false}/>
                    <ToolBar 
                        conflictName="A political conflict" 
                        id={caseId}
                        isChat={true} 
                        groups={groups} 
                        isInfo={usersListClick} 
                        isMediator={isMediator}
                    />
                    
                    <GroupSwitch 
                        isMediator={isMediator} 
                        notifHook={notifications} 
                        closeNotification={closeNotification}
                    />
                </header>

                <div>
                    <MessageList
                        activeGroup={activeGroup}
                        maxHeight={`${size-FOOTER_SIZE-HEADER_SIZE}px`}
                        isLoading = {loadingData.progress < 100}
                        progress = {loadingData.progress}
                        task = {loadingData.task}
                        chatStart = {startChat}

                    /> 
                    
                </div>

                <footer className="cp--footer">
                    <div className="cp--input">
                        <span className="material-symbols-outlined cp--help" onClick={()=>setUsersListClick(prev=>!prev)}>
                            help
                        </span>
                        <textarea
                            dir="auto"
                            onChange={event=>setInputHeight(event, '5px')}
                            className="cp--input-box"
                            id="cp--input-tb"
                        />

                            <button className={`cp--input-btn${shuttelView}`} onClick={setInputValue} disabled={shuttelView==='-shuttel' || loadingData.progress < 100}>
                                <span className="material-symbols-outlined cp--send" >
                                    send
                                </span>
                            </button>
                    </div>
                    <UserPanel
                        handleSwitch={handleShuttle}
                        isSwitched={isShuttled}
                        isComplex={isMediator}
                        caseId= {caseId}
                        centerGroup={centerGroup}
                    />

                </footer> 
        </article>
     
    )

}

export default ChatView