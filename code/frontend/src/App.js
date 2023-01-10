import WebIM from './WebIM';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import  "./components/chat_components/Panel.css";



function App() {
  const [user,setUser] = useState('')
  const [token,setToken] = useState('')
  const [flage,setFlage] = useState(false)
  const [messages,setMessages]= useState([])
  const [to,setTo] = useState('')
  const [msgSend,setMsgSend] = useState('')
  let counter= 0

  const getToken = ()=>{
    axios.get(`http://localhost:8050/get_token/${user}`).then(res=>{
      console.log(res.data.userToken)
      setToken(res.data.userToken)
      setFlage(true)
    })
      
   
  }
  const messageHandler = (msg)=>{
    const from = msg.from
    const arr = [...messages,`${from}: ${msg.sourceMsg}`]
    setMessages(arr)
   
  }

  useEffect(()=>{
    console.log(messages)
  },[messages])


  useEffect(()=>{
        console.log('username: ',user)
        console.log('token',token)
        
        WebIM.conn.open({
        user:user,
        agoraToken:token})},[flage])

  const handleChange = ({currentTarget:input})=>{
    setUser(input.value)
  }

  WebIM.conn.listen({
    onTextMessage: (message)=>messageHandler(message),
    onGroupChange:(message)=>messageHandler(message.sourceMsg),
    onChannelMessage:(message)=>messageHandler(message.sourceMsg)
  })

  const handleMsgSend = ({currentTarget:input})=>{
    if(input.name === 'msg'){
      setMsgSend(input.value)
    }
    if(input.name ==='to')
      setTo(input.value)
  }
  const handleSub = (event)=>{
    event.preventDefault();


   
    const a = user;
    const b = to
    const c = msgSend

    const arr = [...messages,`${a}: ${c}`]

    setMessages(arr)
     axios.post('http://localhost:8050//one_to_one_message',{
      me: a,
      to: b,
      msg: c
    })
  }


  

  return (
    <div className="App">
       {token==='' ? (
        <div>
          <TextField onChange={handleChange}/>
          <Button onClick={getToken}>Login</Button>
        </div>
         ):(

          <div className="messages">
           <center>
           {messages.map((message) => (
             <div className="message" id="message" key={counter++} >{message}</div>
             ))}
           </center>

             <form onSubmit={handleSub}>
              <div className ="input-fields">


              <TextField onChange={handleMsgSend} name='to' className ="to" />
              <TextField onChange={handleMsgSend} name='msg' className="msg"/>
              <Button type="submit">send</Button>

              </div>
          </form>
          </div>
           
        )}
       
    </div>
  );
}

export default App;
