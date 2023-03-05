import axios from 'axios'
import {Server_url} from '../utils/roots'





export const GetJWTToken =async (userDetail)=>{
    
    const {data} = await axios.post(`${Server_url}/auth/jwt/create`,{
        username:userDetail.username,
        password:userDetail.password
    })
    return data 
}

export const GetUserId = async (username,accessToken)=>{
    const {data} =await axios.get(`${Server_url}/users/user_view/get_user/`,{
        params:{
            username:username,
        },
        headers:{
        Authorization: `JWT ${accessToken}`
        }
    })
    return data.id
}
export const ValidateEmail = async (email)=>{
    try{
      await axios.get(`${Server_url}/users/user_view/is_email_exist/`,{
            params:{
                email:email
            }
        })
    }catch{
        return false
    }
    return true    
}