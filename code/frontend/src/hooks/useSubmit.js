import axios from 'axios'
import {Server_url} from '../utils/roots'
const CoreAuthPath = 'http://localhost:8000/core/auth'




const useSubmit = ()=>{


    const GetJWTToken =async (userDetail)=>{
   
    
        
        const {data} = await axios.post(`${CoreAuthPath}/token/`,{
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

    const GetNewAccessToken = async ()=>{
        try{
            const {data} = await axios.post(`${CoreAuthPath}/token/refresh/`,{},{
                withCredentials:true
            })
            return data.access
        }catch(err){
            console.log(err)}
        

    }

    const GetUserId = async (username,accessToken)=>{
        const {data} =await axios.get(`${Server_url}/users/user_view/get_user/`,{
            params:{
                username:username,
            },
            headers:{
            Authorization: `JWT ${accessToken}`
            }
        })
        return data
    }
    const ValidateEmail = async (email)=>{
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
    const GetRole = async (id, accsessToken)=>{
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

    const LogOut = async()=>{

        const {data} =await axios.get(`${CoreAuthPath}/logout/`,{
            withCredentials:true,
        })
        console.log(data)
    }


    return{
        LogOut,
        GetJWTToken,
        GetNewAccessToken,
        GetRole,
        ValidateEmail,
        GetUserId,
    }

}

export default useSubmit
