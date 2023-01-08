import {React,useState} from 'react';
import axios from 'axios'
import {EaseApp, EaseChat} from 'agora-chat-uikit'


const Chat = ()=>{
    const [user, setUser] = useState('')
    const [token,setToken] = useState(null)
    
    const handleChange= ({currentTarget: input})=>{
        setUser(input.value)

    }
    const click = async()=>{
        const uid = user

      const t =  await axios.get(`http://localhost:8050/get_token/${uid}`)

     
      setToken(t.data.userToken)
        
      
    }
    return (
        <div>
        {token==null?(
            <div>
                <input type="text" onChange={handleChange} />
                <button onClick={click}>submit</button>
                </div>
        ):(
            <div>
                   <EaseApp
             // The App key for your chat project
             appkey= '71864841#1052059'
             // The user ID of the current user
             username= {user}
             // The <Vg k="COMPANY" /> token
             agoraToken= {token}
             /> 
            </div>
        )}
        </div>
       

    )
}

export default Chat
