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

    return {
        getMyCases
    }

}

export default useServer