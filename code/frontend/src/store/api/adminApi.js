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
            addMediator: builder.mutation({
                query:({phone,education,relevant_experience,mediation_areas,
                    certification_course,user,access})=>{
                    return{
                        url:'users/mediator_view/',
                        method:'POST',
                        body:{
                            phone:phone,
                            education:education,
                            relevant_experience:relevant_experience,
                            mediation_areas:mediation_areas,
                            certification_course:certification_course,
                            user:{
                                username:user.username,
                                password:user.password,
                                email:user.email,
                                first_name:user.first_name,
                                last_name:user.last_name,
                            },
                        },
                        headers:{
                                Authorization: `JWT ${access}`
                            },
                    }
                }
            }),
            addResident: builder.mutation({
                query: ({city,access})=>{
                    return{
                        url:'/users/address_views/',
                        method:'POST',
                        body:{
                            city:city,
                        },
                        headers:{
                            Authorization: `JWT ${access}`,
                        },
                    }
                }
            }),
            updateMediatorResident: builder.mutation({
                query: ({mediator_id,address_id,access})=>{
                    return{
                        url:'/users/address_mediator/',
                        method:'POST',
                        body: {
                            mediator:mediator_id,
                            address:address_id,
                        },
                        headers:{
                            Authorization: `JWT ${access}`
                        },
                    }
                }
            }),
            getAddresses: builder.query({
                query:({access})=>{
                    return{
                        url:'users/address_views/',
                        method:'GET',
                        headers:{
                            Authorization: `JWT ${access}`
                        },
                    }
                }
            })


        }
    }
})

export {adminApi}



