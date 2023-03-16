import "../styles/chat_page.css"
import ShuttleSwitch from "../components/general/ShuttleSwitch.js";
import ToolBar from "../components/general/ToolBar.js";
import Message from "../components/general/Message.js";
import Header from "../components/general/Header.js";
import {useState} from 'react'
import mockMessages from "./MockMessages.js"

const  Chatpage = ()=> {
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

                    <span className="material-symbols-outlined cp--help">
                        help
                    </span>
                    
                    <input type="text" className="cp--input-box" id="cp--input-tb"></input>
                        {/* send icon */}

                    <button className="cp--input-btn">
                        <span className="material-symbols-outlined cp--send" onClick={handleSend}>
                            send
                        </span>
                    </button>
                </div>
            </center>
        </div>
    )
} 
export default Chatpage