import WebIM from "../WebIM";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";


const useChat = (props)=>{
    const { username } = useSelector(state=>state.user)

    

    
    const openConn = ()=>{

        WebIM.conn.open({
            user:'naor',
            agoraToken:'007eJxTYHj8uunydKUlLKVnfBr2veG5Z/fBOf3Mx/nOc9f9+Cw88dNiBQZzo+SUtBRzI2MDA3OTROOUxCSDxERzCxMDi0TL5OTE5N8H+FIaAhkZipT5mRkZWBkYgRDEV2EwszQyT001N9C1MDVO1jU0TE3RBWpM1U00Nk+xMExOskg1NAIA8Aoqqg=='
        })
    }

    const messagelistener = ()=>{
       WebIM.conn.listen({
        onTextMessage: message =>console.log(message.sourceMsg)
       })
    }
    

    return{
        openConn,
        messagelistener
    }

    



}
export default useChat

