import axios from 'axios'
import {Server_url} from '../utils/roots'





export const GetJWTToken =async (userDetail)=>{
    
    const {data} = await axios.post(`${Server_url}/core/auth/token/`,{
        username:userDetail.username,
        password:userDetail.password
    },{
        withCredentials:true,
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json',
        }
    }
    
    )
    return data
}
export const GetNewAccessToken = async ()=>{
    try{
        const {data} = await axios.post(`${Server_url}/core/auth/token/refresh/`,{},{
            withCredentials:true
        })
        return data.access
    }catch(err){
        console.log(err)}
    

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
export const GetRole = async (id, accsessToken)=>{
    const {data} =await axios.get(`${Server_url}/users/user_view/role/`,{
        params:{
            id:id
        },
        headers:{
            Authorization: `JWT ${accsessToken}`
        }

    })
    
    return data.role
}

export const LogOut = async()=>{

    const {data} =await axios.get(`${Server_url}/core/auth/logout/`,{
        withCredentials:true
    })
    console.log(data)
}
