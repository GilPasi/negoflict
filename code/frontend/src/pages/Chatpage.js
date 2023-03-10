import "../styles/chat_page.css"
import ShuttleSwitch from "../components/generals/ShuttleSwitch.js";
import ToolBar from "../components/generals/ToolBar.js";
import Message from "../components/generals/Message.js";
import Header from "../components/generals/Header.js";
import {useState} from 'react'
import mockMessages from "./MockMessages.js"

const  ChatPage = ()=> {
    const [texts , setTexts] = useState(mockMessages)

    //Map over the messages and extract
    const messages = texts.map(({text , sender , isSelf})=>
            <Message
                 text={text} 
                 sender={sender} 
                 isSelf={isSelf}
            />
        )

        const handleSend =(event)=>{
            event.preventDefault();
            const msg = document.querySelector("#cp--input-tb").value;

            //Avoid empty messages re-rendering
            if(!msg) 
                return

            // Mock values , to be replaced by the backend (Hen)
            const sender = 1
            setTexts(prevText=>[...prevText,{
                text:msg,
                sender:sender,
                isSelf:true,

            }])
        }
    
    return(

        
        <div className="cp">
            <center>
                <div className="cp--paper">
                <Header size="small"/>
                    <ToolBar conflictName="A political conflict" id="100777"/>
                    <ShuttleSwitch/>
                    {messages}
                </div>

                <div className="cp--input">
                    {/* help icon */}

                    <span class="material-symbols-outlined cp--help">
                        help
                    </span>
                    
                    <input type="text" className="cp--input-box" id="cp--input-tb"></input>
                        {/* send icon */}

                    <button class="cp--input-btn">
                        <span class="material-symbols-outlined cp--send" onClick={handleSend}>
                            send
                        </span>
                    </button>
                </div>
            </center>
        </div>
    )
} 
export default ChatPage