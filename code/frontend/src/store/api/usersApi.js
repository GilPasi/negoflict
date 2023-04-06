import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Server_url } from '../../utils/roots'



const usersApi = createApi({
    reducerPath: 'users_api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${Server_url}`,
        
    }),
    endpoints(builder){
        return {
            login: builder.query({
                query: ({username,access}) =>{
                    return {
                        url: '/users/user_view/get_user/',
                        params:{
                            username:username,
                        },
                        headers:{
                        Authorization: `JWT ${access}`
                        },
                        method: 'GET'
                }}})}}})


export const {useLoginQuery} = usersApi
export {usersApi}