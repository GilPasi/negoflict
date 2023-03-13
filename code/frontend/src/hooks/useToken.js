import axios from "axios"

const getToken = ()=>{



    const getUserToken =async (username)=>{
        try{
        const res =await axios.get(`http://localhost:8050/get_token/${username}`)
        return res.data.userToken
        }
        catch(error){
            return null
        }
    }

    return{
        getUserToken
    }

    
}
export default getToken