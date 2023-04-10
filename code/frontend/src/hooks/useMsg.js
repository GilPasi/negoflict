import { useState } from "react"
import { usePostNewMessageMutation } from "../store"


const useMsg = ()=>{
    const [postMsg, {data:dataMsg, isSuccess,error}] = usePostNewMessageMutation()

    const [timeStamp,seTimeStamp] = useState(0)

    const SaveMessage = ({message, memberId,groupChatId})=>{
        const DateTime =  new Date().toISOString()
        const time_left_last_message = getTimeDiff()

        const data = {
            date_time:DateTime,
            time_left_last_message:time_left_last_message,
            text:message.msg,
            user:memberId,
            num_of_chars:message.msg.length,
            group_chat:groupChatId
        }
        postMsg(data)
    }

    const getTimeDiff = ()=> {
        const now = Date.now()
        if(timeStamp==0)return 0
        const difference = now - timeStamp;
        const minutes = Math.floor(difference / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        const result = parseFloat(`${minutes}.${seconds}`);

        seTimeStamp(prev=>now)
      
        return result;
      }
    if(error){
        console.log(error)
    }


    return{
        SaveMessage
    }
    
}

export default useMsg