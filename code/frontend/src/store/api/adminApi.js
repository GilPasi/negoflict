import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import  {ChatServerURL} from "../../utils/agoraCradential";
import { Server_url } from "../../utils/roots";


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
                        url:`${Server_url}/users/mediator_view/`,
                        method:'POST',
                        body:{
                            phone:phone,
                            education:education ?? ' ',
                            relevant_experience:relevant_experience ?? ' ',
                            mediation_areas:mediation_areas,
                            certification_course:certification_course ?? false,
                            ['user.username']:user.username,
                            ['user.password']:'Negoflict123',
                            ['user.email']:user.email,
                            ['user.first_name']:user.first_name,
                            ['user.last_name']:user.last_name,
                         
                        },
                        headers:{
                                Authorization: `JWT ${access}`
                            },
                    }
                }
            }),
            addResident: builder.mutation({
                invalidatesTags:['city'],
                query: ({city,access})=>{
                    return{
                        url:`${Server_url}/users/address_views/`,
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
                        url:`${Server_url}/users/address_mediator/`,
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
                providesTags:['city'],
                query:({access})=>{
                    return{
                        url:`${Server_url}/users/address_views/`,
                        method:'GET',
                        headers:{
                            Authorization: `JWT ${access}`
                        },
                    }
                }
            }),
            isUsernameExist: builder.query({
                query: ({username})=>{
                    return{
                        url:`${Server_url}/users/user_view/is_username_exist/`,
                        method:'GET',
                        params:{
                            username:username
                        },
                    }
                }

            }),
            registerOneUser:builder.mutation({
                invalidatesTags:['oneUser'],
                query:({username,password,first_name})=>{
                    return{
                        url:'/register_user',
                        method:'POST',
                        body:{
                            uid:username,
                            password:password,
                            username:first_name,
                        }
                    }
                }
            }),
        }
    }
})

export {adminApi}



