import WebIM from "../WebIM";
import { useSelector } from "react-redux";
import axios from 'axios'
import { ChatServerURL } from "../utils/agoraCradential";
import { useLazyGetChatTokenQuery} from "../store";


const useChat = (props)=>{
    let { username } = useSelector(state=>state.user)
    const [getChatToken] = useLazyGetChatTokenQuery()


    const openConn = async (isUser)=>{ 
        if(!isUser)
            username = username.replace(/[^\w\s]/gi, '')

         const {data}= await getChatToken({username:username})

         await WebIM.conn.open({
            user: username,
            agoraToken: data.userToken
        })



    }

    const messagelistener = ()=>{
       WebIM.conn.listen({
        onTextMessage: message =>console.log(message.sourceMsg)
       })
    }
    const sendGroupMsg =async (props)=>{
       
        await axios.post('http://localhost:8050/group_message',{
            groupid:props.groupId,
            me:props.username,
            msg:props.msg
          }).then(()=>console.log('sucseesssss'))
        .catch(err=>console.log(err))
    
      }

    const getGropByUser =async (user)=>{
        try{
        const groups =await axios.get(`${ChatServerURL}/get_group_by_user/${user}`)
        return groups.data
        }
        catch(err){
            console.error(err)
            throw new Error(err)
        }
    }
    

    return{
        openConn,
        messagelistener,
        sendGroupMsg,
        getGropByUser
    }

    



}
export default useChat

