import axios from "axios";
import useNodeS from "./useNodeS";


const useServer = ()=>{
    const sessionServerUrl = 'http://localhost:8000/session'
    const authServerUrl = 'http://localhost:8000/auth'
    const { createNewGroup } = useNodeS()


    const getChatGroupsByCase =async ({caseId,side}) => {

        const res =await axios.get(`${sessionServerUrl}/chat_group/get_group_chat_by_case/?case=${caseId}&&chat=${side}`)

        console.log('in use chat',res.data)

        return res.data


    }


    const saveMessage = async({date_time, time_left_last_message,text,group_chat,user,num_of_chars})=>{
        

        const data = {
            date_time:date_time,
            time_left_last_message:time_left_last_message,
            num_of_chars:num_of_chars,
            text:text,
            group_chat:group_chat,
            user:user

        }

        const res =await axios.post(`${sessionServerUrl}/message/`,data)
        return res.data

    }




    const verifyAccessToken =async ({token})=>{
        
        const {status} = await axios.post(`${authServerUrl}/jwt/verify/`,{
            token: token
        })

        console.log(status)

        if(status === 200)
            return true
        
        return false
    }
    
    


    const getMyCases =async (id,access,isMediator)=>{
        console.log(id)
        console.log('is mediator',isMediator)

        const url = isMediator? `${sessionServerUrl}/case/casess_by_mediator/`:
         `${sessionServerUrl}/chat_members/get_case_by_user/?id=${id}`

        const {data} = await axios.get(url,{
            params:{
                id:id
            }
            ,headers:{
                Authorization: `JWT ${access}`
            }
        })
        return data
    }

    

    const postNewCase =async ({title,mediator,category,sub_category,problem_brief, access, owner})=>{

        try{

            

            const res =await axios.post(`${sessionServerUrl}/case/create_case_and_groups/`,{
                title: title,
                mediator:mediator,
                category:category,
                sub_category:sub_category,
                problem_brief:problem_brief,
                summary:null,
                is_cative:true,
            },{
                headers:{
                    Authorization: `JWT ${access}`
                }
            }
                
            )
            const resAgora =await createNewGroup(title,problem_brief,3,owner)


            return {res, resAgora}

        }
        catch(err){
            console.log(err)
        }
        

    }

    const getGroupMemberByUser =async ({caseId,side})=>{

        

        const {data} =await axios.get(`${sessionServerUrl}/chat_members/get_group_member_by_user/?case=${caseId}&side=${side}`)

        console.log('ashfiuehaihfiuasdhfuisdhaifu>>>>>>>>>>',data)

        return data


    }
    const createGroupMember =async (users,accss,idCase)=>{

        const sides = ['A','B']

        const responses =[]

        for(let i=0; i<2; i++){
            const res =await axios.put(`${sessionServerUrl}/chat_members/get_group_member_by_user/?case=${idCase}&side=${sides[i]}`,{
                user:users[i].id
            },{
                headers:{
                    Authorization: `JWT ${accss}`
                }
            })
            responses.push(res.data)
        }
       

        return responses
    }

    return {
        getMyCases,
        postNewCase,
        createGroupMember,
        verifyAccessToken,
        saveMessage,
        getChatGroupsByCase,
        getGroupMemberByUser
    }

}

export default useServer