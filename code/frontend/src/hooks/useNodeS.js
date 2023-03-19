import axios from 'axios'


const useNodeS = ()=>{
    const ServerUrl = 'http://localhost:8050'


    const registerManyUsers =async (users, access)=>{
        try{

        const res =await axios.post(`${ServerUrl}/register_many_users`,{
            users:users,
            access:access
        })
        console.log(res)
    }catch(err){
        console.log(err)
    }

    }

    return{
        registerManyUsers,

    }
}

export default useNodeS