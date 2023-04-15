import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Server_url } from '../../utils/roots'
import {ChatServerURL} from "../../utils/agoraCradential";


const usersApi = createApi({
    reducerPath: 'users_api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${Server_url}`,//8000
        
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
                        method: 'GET'
                    }
                } 
                
            }),
            getNewAccess: builder.query({
                query:()=>{
                    return{
                        url:'/core/auth/token/refresh/',
                        credentials: 'include',
                        method: 'GET'
                    }
                }

            }),
            getToken: builder.query({
                query: ({username,password})=>{
                    return {
                        url: '/core/auth/token/',
                        body:{
                            username:username,
                            password:password,
                        },
                        credentials: 'include',
                        headers:{
                            'Content-Type':'application/json',
                            'Accept':'application/json',
                        },
                        method: 'POST',

                    }}
                }),
            getChatToken: builder.query({
                query: ({username})=>{
                    return{
                        url: `${ChatServerURL}/get_token/${username}`,
                        method: 'GET',
                    }
                }
            }),
            changePassword:builder.mutation({
                query: ({current_password, new_password, access, role})=>{
                    const modifyPassword = role==='user'?`Negoflict${new_password}`:new_password
                    return{
                        url:'/auth/users/set_password/',
                        body:{
                            current_password:current_password,
                            new_password: modifyPassword,
                        },
                        headers:{
                            Authorization: `JWT ${access}`
                        },
                        method: 'POST'
                    }
                } 
            }),
            modifyUser:builder.mutation({
                query:({id,access})=>{
                    //data can be 
                    //email
                    //first_name
                    //last_name
                    //first_logged
                    return{
                        url:`/users/user_view/${id}/`,
                        method:'PATCH',
                        body:{
                            first_logged:false,
                        },
                         headers:{
                            Authorization: `JWT ${access}`,
                            'Content-Type':'application/json',
                            'Accept':'application/json',
                        },
                    }
                }
            })



        }}})


export {usersApi}