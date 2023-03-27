import "../../../styles/pages/chat_page.css"
import ShuttleSwitch from "../../../components/general/ShuttleSwitch";
import ToolBar from "../../../components/general/ToolBar.js";
import UserPanel from "../../../components/general/UserPanel";
import Header from "../../../components/general/Header";
import {useEffect, useState} from 'react'
import MessageList from "../../../components/chat/MessageList.js";
import { useSelector } from "react-redux";
import useChat from "../../../hooks/useChat";
import { useLocation } from "react-router-dom";
import WebIM from "../../../WebIM";





const  ChatPage = ({isMediator})=> {
    const [texts , setTexts] = useState([])
    const [textsA , setTextsA] = useState([])
    const [textsB , setTextsB] = useState([])
    const [msgScreen,setMsgScreen] = useState([])
    const [groups,setaGroups] = useState([])
    const [sideColor,setSideColor] = useState(1)
    const [caseId,setCaseId] = useState('')
 
    const { firstName }= useSelector(state=>state.user)
    const { openConn } = useChat()
    const location = useLocation()
  


    useEffect(()=>{
            const tokenUser = isMediator?.true ?? false  
             openConn(tokenUser)
            const GroupsSubmit = ()=>{
                const groups = location.state?.groups ?? []
                setaGroups(groups)
                console.log(groups)

                if(groups.length<=2){
                    const groupColor = groups.findIndex(group=>group.groupname.endsWith('_B'))
                    const tempSide =groupColor? 2:3
                    setSideColor(tempSide)
                }
            }
            const getCaseId = ()=>{
                let id = location.state?.caseId ?? '100777'

                id = id.slice(-10)

                setCaseId(id)
            }
            GroupsSubmit()
            getCaseId()
                
    },[])

    WebIM.conn.listen({
        onTextMessage: (message)=>handleRecive(message)
    })


    

    const handleRecive = (message)=>{
        const {to, from, data, ext} = message



        let messageTo = groups.find(group=>group.groupid === to)
  

        if(!message || messageTo === 'undifined')
            return

        let colorMsg = ext.color

        if(colorMsg===1){
            colorMsg = sideColor===2?2:3
        }
        console.log(groups)
      
            
        
            const sideSend = messageTo.groupname.charAt(messageTo.groupname.length - 1);
            console.log('sidddeeee',sideSend)
        
            let sideSendMessage
            if(isMediator){
                switch(sideSend){
                    case 'A':
                        sideSendMessage=1
                        break
                    case 'G':
                        sideSendMessage=2
                        break
                    case 'B':
                        sideSendMessage=3
                        break
                }
            }
            else{
                switch(sideSend){
                    case 'A':
                        sideSendMessage=1
                        break
                    case 'G':
                        sideSendMessage=2
                        break
                    case 'B':
                        sideSendMessage=1
                        break
                }

            }

        postNewMessage({
                msg:data,
                sender:colorMsg,
                position:sideSendMessage,
                senderName:ext.name,
                isSelf:false
            })


    }

    useEffect(()=>{
        setMsgScreen(texts)
    },[])
    

    

    const {pos} = useSelector(state=>state.pos)
    
    

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
        console.log('pposoososososo',position)
    },[pos,texts,textsA,textsB])

    

        const handleSend = (event)=>{
            const position = pos
            event.preventDefault();
           
            const msg = document.querySelector("#cp--input-tb").value;

            
            if(!msg) 
                return
            
                
            
            let toGroup
            if(isMediator){
            switch(position){
                case 1:
                    toGroup = groups[0].groupid
                    break
                case 2:
                    toGroup = groups[2].groupid
                    break
                case 3:
                    toGroup = groups[1].groupid
                    break
            }
        }
        else{
            toGroup = groups[position-1].groupid
        }

            const option = {
                chatType:'groupChat',
                type:'txt',
                to:toGroup,
                msg:msg,
                ext:{
                    name:firstName,
                    color:sideColor
                }
            }

            const message = WebIM.message.create(option)
            WebIM.conn.send(message)

            // Mock values , to be replaced by the backend (Hen)
            postNewMessage({
                msg:msg,
                sender:1,
                position:position,
                senderName:firstName,
                isSelf:true
            })
        }

        

        const postNewMessage = ({msg,sender,position,senderName,isSelf})=>{
            const now = new Date();
            const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const randId = Math.floor(Math.random() * 100000) + 1

            console.log('in post new message',msg, position)

            const newMessage = {
                text:msg,
                sender:sender,
                isSelf:isSelf,
                position:position,
                time:time,
                senderName:senderName,
                id: randId,
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
                document.querySelector("#cp--input-tb").value = "";

        }


        const handleShuttle =()=> {
            setIsShuttled(prevState=>{
                console.log("prevState " + prevState)
                return(!prevState)    
            })
        }
        
    
    return(

        
        <article className="cp" >
            <div className="limiter">
                <div
                 style={{
                    position:"fixed",
                    top:"0",
                    width:"100%",
                    backgroundColor:"white" //This is crucial for hiding the MessageList

                }}>
                <Header isLarge={false}/>
                    <ToolBar conflictName="A political conflict" id={caseId}/>
                    <ShuttleSwitch isMediator={isMediator}/>

                </div>
            </div>
            <div >
                <MessageList messages={msgScreen} position={pos}/>
            </div>
            <div>
            <section className="cp--footer">
                <div className="cp--input">
                    <span class="material-symbols-outlined cp--help">
                        help
                    </span>
                    <textarea  className="cp--input-box" id="cp--input-tb"></textarea>
                        <button className="cp--input-btn">
                            <span className="material-symbols-outlined cp--send" onClick={handleSend}>
                                send
                            </span>
                        </button>
                </div>
                <UserPanel
                    handleSwitch={handleShuttle}
                    isSwitched={isShuttled}
                />
            </section>
            </div>
            <UserPanel/>
        </div>
    )
} 
export default ChatPage