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
            const response =await axios.post(`${userServerURL}/case/`,{
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

            return response

        }
        catch(err){
            console.log(err)
        }
        

    }

    return {
        getMyCases,
        postNewCase,
    }

}

export default useServer