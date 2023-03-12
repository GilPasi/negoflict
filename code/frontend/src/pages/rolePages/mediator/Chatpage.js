import "../../../styles/chat_page.css"
import ShuttleSwitch from "../../../components/general/ShuttleSwitch";
import ToolBar from "../../../components/general/ToolBar";
import Message from "../../../components/general/Message";
import Header from "../../../components/general/Header";
import {useEffect, useState} from 'react'
import mockMessages from "../../MockMessages.js"
import MessageList from "../../../components/chat/MessageList.js";
import { useSelector } from "react-redux";

const  ChatPage = ({isMediator})=> {
    const [texts , setTexts] = useState([])
    const [textsA , setTextsA] = useState([])
    const [textsB , setTextsB] = useState([])
    const [msgScreen,setMsgScreen] = useState([])
    console.log('lala')

    useEffect(()=>{
        setMsgScreen(texts)
    },[])
    

    const {pos} = useSelector(state=>state.pos)
    console.log(pos)
    console.log(msgScreen)
    
    

   

    useEffect(()=>{
        const position = pos
        switch(position){
            case 1:
                setMsgScreen([])
                setMsgScreen(textsA)
                break
            case 2:
                setMsgScreen([])
                setMsgScreen(texts)
                break
            case 3:
                setMsgScreen([])
                setMsgScreen(textsB)
                break
        }
    },[pos,texts,textsA,textsB])

    

        const handleSend =(event)=>{
            const position = pos
            event.preventDefault();
            const msg = document.querySelector("#cp--input-tb").value;

            //Avoid empty messages re-rendering
            if(!msg) 
                return

            // Mock values , to be replaced by the backend (Hen)
            const sender = 1
            
           const newMessage = {
            text:msg,
            sender:sender,
            isSelf:true,
            position:position

           }
            switch(position){
                case 1:{
                    setTextsA(prevText=>[...prevText,newMessage])
                    break
                }
                case 2:{
                    setTexts(prevText=>[...prevText,newMessage])
                    break
                }   
                case 3:{
                    setTextsB(prevText=>[...prevText,newMessage])
                }
                break
                }
        }
        
    
    return(

        
        <div className="cp" >

            <div className="centerizer">
                <div className="limiter">
                <Header size="small"/>
                    <ToolBar conflictName="A political conflict" id="100777"/>
                    <ShuttleSwitch isMediator={isMediator}/>
                </div>
            </div>
            <div className="centerizer">
                <div className="cp--paper">
                    <MessageList messages={msgScreen} position={pos}/>
                </div>
            </div>
            <div className="centerizer">
                <div className="cp--input limiter">

                    <span class="material-symbols-outlined cp--help">
                        help
                    </span>
                    <textarea  className="cp--input-box" id="cp--input-tb"></textarea>
                        <button class="cp--input-btn">
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