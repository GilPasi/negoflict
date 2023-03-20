import axios from "axios";


const useServer = ()=>{
    const userServerURL = 'http://localhost:8000/session'


    const getMyCases =async (id,access)=>{
        console.log(id)
        const {data} = await axios.get(`${userServerURL}/case/casess_by_mediator/`,{
            params:{
                id:id
            }
            ,headers:{
                Authorization: `JWT ${access}`
            }
        })
        return data
    }

    const postNewCase =async ({title,mediator,category,sub_category,problem_brief, access})=>{

        try{
            const response =await axios.post(`${userServerURL}/case/create_case_and_groups/`,{
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
            console.log(response.data)

            return response

        }
        catch(err){
            console.log(err)
        }
        

    }
    const createGroupMember =async (users,accss,idCase)=>{

        const sides = ['A','B']

        const responses =[]

        for(let i=0; i<2; i++){
            const res =await axios.put(`${userServerURL}/chat_members/get_group_member_by_user/?case=${idCase}&side=${sides[i]}`,{
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
    }

}

export default useServer