import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import  {ChatServerURL} from "../../utils/agoraCradential";


const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${ChatServerURL}`,
    }),
    endpoints(builder) {
        return {
            registerUsers: builder.mutation({
                query: ({users,access,caseId}) =>{

                    return{
                        url: '/register_many_users',
                        method: 'POST',
                        body: {
                            users:users,
                            access:access,
                            caseId:caseId,
                        },
                    }
                }
            }),
            registerToChatGroups: builder.mutation({
                query: ({groups,users})=>{
                    const groupA = groups[0].A.data.groupid
                    const groupB = groups[1].B.data.groupid
                    const groupG = groups[2].G.data.groupid
                    const userA = users[0].username.replace(/[^\w\s]/gi, '')
                    const userB = users[1].username.replace(/[^\w\s]/gi, '')

                    const USERS = [
                        {id:userA, groups:[groupA, groupG]},
                        {id:userB, groups:[groupB, groupG]},
                    ]
                    return{
                        url: '/add_users_to_groups',
                        body:{
                            users:USERS
                        },
                        method: 'POST'
                    }
                }
            }),


        }
    }
})

export {adminApi}



