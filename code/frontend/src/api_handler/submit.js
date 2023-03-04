import axios from 'axios'
import roots from '../utils/roots'





const GetJWTToken =async (userDetail)=>{

    const {data} = await axios.post(`${roots.Server_url}/auth/jwt/create`,{
        username:userDetail.username,
        password:userDetail.password
    })
    console.log(data)
    

    

   
    

   

  
   
   

   

}

export default GetJWTToken