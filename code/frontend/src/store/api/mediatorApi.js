import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { Server_url } from '../../utils/roots'



const mediatorApi = createApi({
    reducerPath: 'mediator_api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${Server_url}`,
    }),
    endpoints(builder){
        return{
            get_clients: builder.query({
                providesTags:['oneUser'],
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

        }
    }
})

export {mediatorApi}