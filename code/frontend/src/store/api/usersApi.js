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
                }}}),

            is_login: builder.query({
                query: access =>{
                    return{
                        url: '/auth/jwt/verify/',
                        body: {
                            token:access
                        },
                        method: 'POST',
                }}
            }),
            log_out: builder.query({
                query:()=>{
                    return {
                        url:'/core/auth/logout/',
                        credentials:'include',
                    }
                } 
                
            }),
            getNewAccess: builder.query({
                query:()=>{
                    return{
                        url:'/core/auth/token/refresh/',
                        credentials: 'include'
                    }
                }

            }),


        }}})



export {usersApi}