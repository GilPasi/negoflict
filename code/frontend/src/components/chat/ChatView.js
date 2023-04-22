import '../../styles/pages/chat_page.css'
import Header from '../general/Header'
import ShuttleSwitch from '../general/ShuttleSwitch'
import MessageList from './MessageList'
import UserPanel from '../general/UserPanel'
import ToolBar from '../general/ToolBar'
import { useState, useEffect} from 'react';



const ChatView = ({isMediator, caseId,activeGroup,handleSend, handleShuttle, isShuttled, role, muted,centerGroup})=>{

    const [size, setSize] = useState(window.innerHeight);
    const shuttelView =muted
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


    //Important! when resizing the sizes the grid division
    //will not automatically  fix itself. You need to manually
    //magic number FOOTER_SIZE and HEADER_SIZE
    const FOOTER_SIZE = 125 , HEADER_SIZE = 175    


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
    //___Hen: update showShuttleMsg___
    const showShuttleMsg = shuttelView==='-shuttel'

    
    const shuttleMsgStyle={
        zIndex:showShuttleMsg ? '1' : '-1',
        top:`${showShuttleMsg? HEADER_SIZE: 0}px`,
        opacity: showShuttleMsg ? '0.5' : '0',
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
            }}
            
        >
            <p className='cp--shuttled-msg' style={shuttleMsgStyle}>
               {isMediator?'Shuttle mode activated, main chat is temporary unavailable.' : 
               'Shuttle mode is active, users can only send you private messages'}
            </p>
                <header className='cp--header'>
                    <Header isLarge={false}/>
                    <ToolBar conflictName="A political conflict" id={caseId}  isChat={true}/>
                    <ShuttleSwitch isMediator={isMediator}/>
                </header>

                <div>
                    <MessageList activeGroup={activeGroup} 
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

                            <button className={`cp--input-btn${shuttelView}`} onClick={setInputValue} disabled={shuttelView==='-shuttel'}>
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



// <div
//                 className="cp--shuttle-block"
//                 style={{
//                     display:isShuttled? "": "none", //deleted &&(msgScreen===texts)
//                     backgroundColor: "#011202db",
//                     opacity:"0.95"
//                 }}
                
//                 >
//                     <div className="cp--shuttle-block-msg">
//                         {/* Render the right message according the user */}
//                             {isMediator?(
//                                 <p>
//                                     Ths is is a Shuttle mode.
//                                     <br/>
//                                     You cannot contact the second party.
//                                     <br/>
//                                     <br/>
//                                     You can contact Mediator in your private chat.
//                                 </p>
//                                 ):(
//                                 <p>
//                                     You turned on the shuttle mode.<br/>
//                                     Only private chats are available for all users.
//                                 </p> 
//                                 )}
//                     </div>

//                 </div>

//                 <div className="cp--shuttle-block"></div>
