import ShuttleSwitch from "../../../components/general/ShuttleSwitch";
import ToolBar from "../../../components/general/ToolBar.js";
import Message from "../../../components/general/Message";
import Header from "../../../components/general/Header";
import {useEffect, useState} from 'react'
import mockMessages from "../../MockMessages.js"
import MessageList from "../../../components/chat/MessageList.js";
import { useSelector } from "react-redux";

const  ChatPage = ()=> {
    const [texts , setTexts] = useState(mockMessages)
    const [textsA , setTextsA] = useState([])
    const [textsB , setTextsB] = useState([])
    const [msgScreen,setMsgScreen] = useState(texts)
    
    

    const {pos} = useSelector(state=>state.pos)
    
    

   

    useEffect(()=>{
        switch(pos){
            case 1:
                setMsgScreen(textsA)
                break
            case 2:
                setMsgScreen(texts)
                break
            case 3:
                setMsgScreen(textsB)
                break
        }
    }, [pos,texts,textsA,textsB])

    

        const handleSend =(event)=>{
            event.preventDefault();
            const msg = document.querySelector("#cp--input-tb").value;

            //Avoid empty messages re-rendering
            if(!msg) 
                return

            // Mock values , to be replaced by the backend (Hen)
            const sender = 1
            
           
          
            

            switch(pos){
                case 1:{
                    setTextsA(prevText=>[...prevText,{
                        text:msg,
                        sender:sender,
                        isSelf:true,
        
                    }])
                    break
                }
                case 2:{
                    setTexts(prevText=>[...prevText,{
                        text:msg,
                        sender:sender,
                        isSelf:true,
        
                    }])
                    break
                }   
                case 3:{
                    setTextsB(prevText=>[...prevText,{
                        text:msg,
                        sender:sender,
                        isSelf:true,
        
                    }])
                }
                break
                }
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
                    <MessageList messages={msgScreen}/>
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