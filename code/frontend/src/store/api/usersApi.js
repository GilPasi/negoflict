import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Server_url } from '../../utils/roots'


const usersApi = createApi({
    reducerPath: 'users_api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${Server_url}`,
        prepareHeaders: (headers,{getState})=>{
            const access = getState().user.access
            if(access)
                headers.set("Authorization", `JWT ${access}`)
            return headers
        }
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
                        method: 'POST'
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
                        // headers:{
                        //     'Content-Type':'application/json',
                        //     'Accept':'application/json',
                        // },
                        method: 'POST',

                    }}
                }),
            getChatToken: builder.query({
                query: ({username})=>{
                    return{
                        url: `agora/get_token/user/`,
                        method: 'GET',
                        params:{
                            uid:username
                        }
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
                        // headers:{
                        //     Authorization: `JWT ${access}`
                        // },
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
                        //  headers:{
                        //     Authorization: `JWT ${access}`,
                        //     'Content-Type':'application/json',
                        //     'Accept':'application/json',
                        // },
                    }
                }
            }),
            getMyMediator:builder.query({
                query:({mediatorId})=>{
                    return{
                        url:'/users/mediator_view/my_mediator/',
                        params:{
                            id:mediatorId
                        },
                        method:'GET'
                    }
                }
            }),
            isEmailExist:builder.query({
                query:({email})=>{
                    return{
                        url:'/users/user_view/is_email_exist/',
                        params:{
                            email:email
                        },
                        method:'GET'
                    }
                }
            }),
            getUserByAccess: builder.query({
                query: ({ access }) => {
           
                  return {
                    url: '/users/user_view/',
                    method: 'GET',
                    headers: {
                      'Authorization': `JWT ${access}`,
                    },
                  };
                },
              }),



        }}})


export {usersApi}