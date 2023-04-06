import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ChatServerURL } from '../../utils/agoraCradential'

const groupApi = createApi({
    reducerPath: 'group_api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${ChatServerURL}`,
    }),
    endpoints(builder){
        return {
            getGroupsByUser: builder.query({
                query: ({username})=>{
                    return {
                        url: `/get_group_by_user/${username}`,
                        method: 'GET'
                    }}
                }),
            
            }}
})

export {groupApi}
