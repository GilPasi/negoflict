import '../../styles/pages/chat_page.css'
import Header from '../general/Header'
import ShuttleSwitch from '../general/ShuttleSwitch'
import MessageList from './MessageList'
import UserPanel from '../general/UserPanel'
import ToolBar from '../general/ToolBar'


const ChatView = ({isMediator, caseId,activeGroup,handleSend, handleShuttle, isShuttled})=>{

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
    }
    return(
        <article className="cp" >

            
            <div
                className="cp--shuttle-block"
                style={{
                    display:isShuttled? "": "none", //deleted &&(msgScreen===texts)
                    backgroundColor: "#011202db",
                    opacity:"0.95"
                }}
                
                >
                    <div className="cp--shuttle-block-msg">
                        {/* Render the right message according the user */}
                            {isMediator?(
                                <p>
                                    Ths is is a Shuttle mode.
                                    <br/>
                                    You cannot contact the second party.
                                    <br/>
                                    <br/>
                                    You can contact Mediator in your private chat.
                                </p>
                                ):(
                                  <p>
                                    You turned on the shuttle mode.<br/>
                                    Only private chats are available for all users.
                                  </p> 
                                  )}
                    </div>

                </div>

                <div className="cp--shuttle-block"></div>
                <div
                 style={{
                    position:"fixed",
                    top:"0",
                    left:'0',
                    right:'0',
                    backgroundColor:"white", //This is crucial for hiding the MessageList
                    zIndex:"1",
                }}>

                    <Header isLarge={false}/>
                    <ToolBar conflictName="A political conflict" id={caseId}/>
                    <ShuttleSwitch isMediator={isMediator}/>
                </div>
                {/* <div >
                <MessageList activeGroup={activeGroup}/>
            </div> */}

            <div>
            <footer className="cp--footer">
                <div className="cp--input">
                    <span className="material-symbols-outlined cp--help">
                        help
                    </span>
                    <textarea
                        dir="auto"
                        onChange={event=>setInputHeight(event, '10px')}
                        className="cp--input-box"
                        id="cp--input-tb"
                     />

                        <button className="cp--input-btn" onClick={setInputValue}>
                            <span className="material-symbols-outlined cp--send" >
                                send
                            </span>
                        </button>
                </div>
                <UserPanel
                    handleSwitch={handleShuttle}
                    isSwitched={isShuttled}
                    isComplex={true}
                />
            </footer>
            </div>
        </article>
     
    )

}

export default ChatView




