import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Server_url } from "../../utils/roots";



const msgApi = createApi({
    reducerPath: 'msg',
    baseQuery: fetchBaseQuery({
        baseUrl: `${Server_url}`
    }),
    endpoints(builder){
        return {
            postNewMessage: builder.mutation({
                query: ({date_time, time_left_last_message,text,group_chat,user,num_of_chars})=>{
                    return{
                        url: '/session/message/',
                        method:'POST',
                        body:{
                            date_time:date_time,
                            time_left_last_message:time_left_last_message,
                            num_of_chars:num_of_chars,
                            text:text,
                            group_chat:group_chat,
                            user:user
                        }

                    }
                    
                }
            })
        }
    }
})

export {msgApi}