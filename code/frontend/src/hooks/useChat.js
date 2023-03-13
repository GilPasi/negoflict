import WebIM from "../WebIM";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import getToken from "./useToken";
import axios from 'axios'
import { ChatServerURL } from "../utils/agoraCradential";


const useChat = (props)=>{
    const { username } = useSelector(state=>state.user)
    const {getUserToken} = getToken()  


    const openConn = async ()=>{ 
        const token = await getUserToken(username)
        WebIM.conn.open({
            user:username,
            agoraToken:token
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
        const groups =await axios.get(`${ChatServerURL}/get_group_by_user/${user}`)
        return groups.data
    }
    

    return{
        openConn,
        messagelistener,
        sendGroupMsg,
        getGropByUser
    }

    



}
export default useChat

