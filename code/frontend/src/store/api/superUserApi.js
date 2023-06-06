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
            })
        }
        
    }})

    export {superUserApi}