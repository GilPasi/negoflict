import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ChatServerURL } from '../../utils/agoraCradential'

const groupApi = createApi({
    reducerPath: 'group_api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${ChatServerURL}`, //8050
    }),
    endpoints(builder){
        return {
            getGroupsByUser: builder.query({
                providesTags: ['chatGroup'],
                query: ({username})=>{
                    return {
                        url: `/get_group_by_user/${username}`,
                        method: 'GET'
                    }}
                }),
            createNewGroup: builder.mutation({
                invalidatesTags: ['chatGroup'],
                query: ({title,desc,maxusers,owner})=>{
                    const description = desc || 'No description'
                    const maxUsers = maxusers || 50
                    return {
                        url:'/create_groups',
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
            
            }}
})

export {groupApi}
