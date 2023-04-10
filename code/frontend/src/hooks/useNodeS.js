import axios from 'axios'



const useNodeS = ()=>{
    const ServerUrl = 'http://localhost:8050'


    const registerManyUsers =async (users, access,caseId)=>{
        try{

        const res =await axios.post(`${ServerUrl}/register_many_users`,{
            users:users,
            access:access,
            caseId:caseId
        })
        
        return res
    }catch(err){
      
        return err.response
    }

    }
    const createNewGroup =async (groupname,desc,maxusers,owner)=>{
        const description = desc ?? 'No description'
        const maxUsers = maxusers ?? 3


        const res = await axios.post(`${ServerUrl}/create_groups`,{
            groupname: groupname,
            desc: description,
            maxusers: maxUsers,
            owner: owner
        })
        

        return res.data
    }
    const registerUsersTogroups =async (groups,users)=>{


        const groupA = groups[0].A.data.groupid
        const groupB = groups[1].B.data.groupid
        const groupG = groups[2].G.data.groupid
        const userA = users[0].username.replace(/[^\w\s]/gi, '')
        const userB = users[1].username.replace(/[^\w\s]/gi, '')

        const responses = []

        const res1 =await axios.post(`${ServerUrl}/add_users_to_groups`,{
            groupsId:[groupA,groupG],
            user:userA
            
        })
        responses.push(res1.data)
        

        const res2 =await axios.post(`${ServerUrl}/add_users_to_groups`,{
            groupsId:[groupB,groupG],
            user:userB
            
        })
        responses.push(res2.data)

        return responses

    }

    return{
        registerManyUsers,
        createNewGroup,
        registerUsersTogroups

    }

   

   
}

export default useNodeS