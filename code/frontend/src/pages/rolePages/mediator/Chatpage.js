import ShuttleSwitch from "../../../components/generals/ShuttleSwitch.js";
import ToolBar from "../../../components/generals/ToolBar.js";
import Message from "../../../components/generals/Message.js";
import Header from "../../../components/generals/Header.js";
import {useState} from 'react'
import mockMessages from "../../MockMessages.js"
import MessageList from "../../../components/chat/MessageList.js";

const  ChatPage = ()=> {
    const [texts , setTexts] = useState(mockMessages)

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

        
        <div className="cp" >

            <div className="centerizer">
                <div className="cp--top">
                <Header size="small"/>
                    <ToolBar conflictName="A political conflict" id="100777"/>
                    <ShuttleSwitch/>
                </div>
            </div>

            <div className="centerizer">
                <div className="cp--paper">
                    <MessageList messages={texts}/>
                </div>
            </div>


        <div className="centerizer">
            <div className="cp--input">
                    {/* send Icon */}

                <span class="material-symbols-outlined cp--help">
                    help
                </span>
                <input type="text" className="cp--input-box" id="cp--input-tb"></input>

                    <button class="btn cp--input-btn">
                        <span class="material-symbols-outlined cp--send" onClick={handleSend}>
                            send
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
} 
export default ChatPage