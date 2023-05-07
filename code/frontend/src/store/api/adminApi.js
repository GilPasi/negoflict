import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Server_url } from "../../utils/roots";


const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${Server_url}`,
        prepareHeaders: (headers,{getState})=>{
            const access = getState().user.access
            if(access)
                headers.set("Authorization", `JWT ${access}`)
            return headers
        }
    }),
    endpoints(builder) {
        return {
            registerUsers: builder.mutation({ // finish
                query: ({users,access,caseId}) =>{
                    return{
                        url: `/agora/users/register_users/`,
                        method: 'POST',
                        body: {
                            users:users,
                            access:access,
                            caseId:caseId,
                        },
                    }
                }
            }),
            createUsers: builder.mutation({ //finish
                query: ({users, access})=>{
                    return{
                        url:`/users/user_view/create_users/`,
                        method:'POST',
                        body: users,
                        // headers:{
                        //     Authorization: `JWT ${access}`
                        // }
                    }
                }
            }),
            registerToChatGroups: builder.mutation({//FINISH
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
                        url: `/agora/groups/add_users_to_groups/`,
                        body:{
                            users:USERS
                        },
                        method: 'POST'
                    }
                }
            }),
            addingManyUsersToOneChatGroup: builder.mutation({
                query: ({users,group})=>{
                    let Users = []

                    users.forEach(user=>{
                       let username = user.email.replace(/[^\w\s]/gi, '')
                       Users = [...Users, username]
                    })
                return{
                    url:'/agora/groups/adding_many_users_to_group/',
                    method: 'POST',
                    body:{
                        users:Users,
                        group:group,
                    }
                }

                }

            }),
            addMediator: builder.mutation({
                query:({phone,education,relevant_experience,mediation_areas,
                    certification_course,user,access})=>{
                    return{
                        url:`/users/mediator_view/`,
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
                        // headers:{
                        //         Authorization: `JWT ${access}`
                        //     },
                    }
                }
            }),
            addResident: builder.mutation({
                invalidatesTags:['city'],
                query: ({city,access})=>{
                    return{
                        url:`/users/address_views/`,
                        method:'POST',
                        body:{
                            city:city,
                        },
                        // headers:{
                        //     Authorization: `JWT ${access}`,
                        // },
                    }
                }
            }),
            updateMediatorResident: builder.mutation({
                query: ({mediator_id,address_id,access})=>{
                    return{
                        url:`/users/address_mediator/`,
                        method:'POST',
                        body: {
                            mediator:mediator_id,
                            address:address_id,
                        },
                        // headers:{
                        //     Authorization: `JWT ${access}`
                        // },
                    }
                }
            }),
            getAddresses: builder.query({
                providesTags:['city'],
                query:({access})=>{
                    return{
                        url:`/users/address_views/`,
                        method:'GET',
                        // headers:{
                        //     Authorization: `JWT ${access}`
                        // },
                    }
                }
            }),
            isUsernameExist: builder.query({
                query: ({username})=>{
                    return{
                        url:`/users/user_view/is_username_exist/`,
                        method:'GET',
                        params:{
                            username:username
                        },
                    }
                }

            }),
            registerOneUser:builder.mutation({//finish
                invalidatesTags:['oneUser'],
                query:({username,password,first_name})=>{
                    const uid = username.replace(/-/g, "")
                    return{
                        url:`/agora/users/register_user/`,
                        method:'POST',
                        body:{
                            uid:uid,
                            password:password,
                            username:first_name,
                        }
                    }
                }
            }),
            registerManyUsersToChatMemberGroup:builder.mutation({
                query:({users, group_chat, caseChat,side})=>{
                    return{
                        url:'/session/chat_members/register_many_users/',
                        method:'POST',
                        body:{

                        }
                    }
                }

            }),
        }
    }
})

export {adminApi}



