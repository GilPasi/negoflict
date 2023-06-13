import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { Server_url } from '../../utils/roots'



const mediatorApi = createApi({
    reducerPath: 'mediator_api',
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
        return{
            get_clients: builder.query({ //not in use- 
                providesTags:['oneUser','contact'],
                query:({mediator_id})=>{
                    return{
                        url:'/session/chat_members/get_mediator_client/',
                        method: 'GET',
                        params:{
                            mediator:mediator_id
                        }
                    }
                }
            }),
            getContacts: builder.query({
                providesTags:['contact'],
                query:({mediator_id})=>{
                    return{
                        url:'/session/contact/get_contact_by_mediator/',
                        method:'GET',
                        params:{
                            mediator:mediator_id
                        },
                    }
                }
            }),
            createContact: builder.mutation({
                invalidatesTags:['contact'],
                query:({mediator_id,user_id})=>{
                    return{
                        url:'/session/contact/',
                        method:'POST',
                        body:{
                            user:user_id,
                            mediator:mediator_id
                        },
                    }
                }
            }),
            get_all_users: builder.query({
                providesTags:['contact'],
                query: ()=>{
                    return{
                        url:'users/user_view/get_all_users_not_related/',
                        method:'GET'
                    }
                }
            }),
            removeContact: builder.mutation({
                invalidatesTags:['contact'],
                query:({contact})=>{
                    return{
                        url:`/session/contact/${contact}/`,
                        method:'DELETE',
                    }
                }
            })
            

        }
    }
})

export {mediatorApi}