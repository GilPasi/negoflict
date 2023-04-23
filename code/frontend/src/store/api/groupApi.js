import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ChatServerURL } from '../../utils/agoraCradential'
import { Server_url } from '../../utils/roots'

const groupApi = createApi({
    reducerPath: 'group_api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${ChatServerURL}`, //8050
    }),
    endpoints(builder){ 
        return {
            getGroupsByUser: builder.query({ //finish
                providesTags: ['chatGroup'],
                query: ({username})=>{
                    return {
                        url: `${Server_url}/agora/groups/get_groups_by_user/`,
                        method: 'GET',
                        params:{
                            username:username
                        }
                    }}
                }),
            createNewGroup: builder.mutation({ //finish
                invalidatesTags: ['chatGroup'],
                query: ({title,desc,maxusers,owner})=>{
                    const description = desc || 'No description'
                    const maxUsers = maxusers || 50
                    return {
                        url:`${Server_url}/agora/groups/create_groups/`,
                        body:{
                            groupname: title,
                            desc: description,
                            maxusers: maxUsers,
                            owner: owner,
                        },
                        method: 'POST'
                    }
                }

            }),
            getChatGroups: builder.query({ //+
                query: ({CaseId})=>{
                    return {
                        url:`${Server_url}/session/chat_group/get_chat_groups_by_case/?case=${CaseId}`,
                        method:'GET',

                    }
                }
            }),
            deleteGroup: builder.mutation({//finish
                query:({groupS})=>{
                    return{
                        url:`${Server_url}/agora/groups/delete_groups/`,
                        method:'DELETE',
                        body:{
                            groups:groupS
                        }
                    } 
                }
            }),
            }}
})

export {groupApi}
