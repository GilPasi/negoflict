import axios from "axios"
import {ChatServerURL} from '../utils/agoraCradential'


export const RegisterNewChatUser =async ({accessToken},username,password)=>{

    console.log(accessToken,password,username)

    const user = await axios.post(`${ChatServerURL}/register_user/`,{
        access:accessToken,
        password:password,
        username:username,
    }).catch(err=>console.log(err))

    return user.data
}