import WebIM from './WebIM';
import React, { useState, useEffect } from 'react';
import axios from 'axios'


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
    const arr = [...messages,msg]
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
    onTextMessage: (message)=>messageHandler(message.sourceMsg),
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
    messageHandler(c)
     axios.post('http://localhost:8050//one_to_one_message',{
      me: a,
      to: b,
      msg: c
    })
  }


  

  return (
    <div className="App">
      <input onChange={handleChange}/>
      <button onClick={getToken}>Submit</button>
      <ul>
        {messages.map((message) => (
          <li key={counter++}>{message}</li>
        ))}
      </ul>
      <form onSubmit={handleSub}>
        <input onChange={handleMsgSend} name='msg'/>
        <input onChange={handleMsgSend} name='to'/>
        <button>send</button>
      </form>
       
    </div>
  );
}

export default App;
