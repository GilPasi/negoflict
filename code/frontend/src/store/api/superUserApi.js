import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Server_url } from '../../utils/roots'


const superUserApi = createApi({
    reducerPath: 'super_user_api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${Server_url}`,
        prepareHeaders: (headers,{getState})=>{
            const access = getState().user.access
            if(access)
                headers.set("Authorization", `JWT ${access}`)
            return headers
        }
    }),endpoints(builder){
        return{
            getMediators:builder.query({
                query:()=>{
                    return{
                        url:'/users/mediator_view/',
                        method:'GET'
                    }
                }
            }),
            deleteMediator: builder.mutation({
                query:({userId})=>{
                    return{
                        url:`/users/mediator_view/${userId}/`,
                        method:'DELETE',
                    }
                }
            }),
            changing_userPassword: builder.mutation({
                query:({userId, password})=>{
                    return{
                        url:'/users/user_view/changing_password/',
                        method:'PUT',
                        body:{
                            id:userId,
                            password:password
                        }
                    }
                }
            }),
            changeFirstLogin: builder.mutation({
                query:({userId})=>{
                    return{
                        url:`/users/user_view/change_first_entry_attribute/`,
                        method:'PUT',
                        body:{
                            id:userId
                        }
                    }
                }
            }),
            getUserById: builder.query({
                query:({userId})=>{
                    console.log('jjrfjr',userId)
                    return{
                        url:'users/user_view/get_user_by_id/',
                        method:'GET',
                        params:{
                            id:userId
                        }
                    }
                }
            }),
            getThemAll: builder.query({
                query:()=>{
                    return{
                        url:'/users/user_view/get_all_users/',
                        method:'GET'
                    }
                }
            }),
        }
        
    }})

    export {superUserApi}