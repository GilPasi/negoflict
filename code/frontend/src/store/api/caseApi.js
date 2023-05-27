import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Server_url } from "../../utils/roots";

const caseApi = createApi({
  reducerPath: "case_api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${Server_url}`,
    prepareHeaders: (headers,{getState})=>{
        const access = getState().user.access
        if(access)
            headers.set("Authorization", `JWT ${access}`)
        return headers
    }
}),
  endpoints(builder) {
    return {
      get_my_cases: builder.query({
        providesTags:['Cases'],
        query: ({ id, access, isMediator }) => {
          const url = isMediator
            ? `${Server_url}/session/case/casess_by_mediator/`
            : `${Server_url}/session/chat_members/get_case_by_user/`;
          return {
            url: url,
            params: {
              id: id,
            },
            // headers: {
            //   Authorization: `JWT ${access}`,
            // },
          }
        }
      }),

      post_new_case: builder.mutation({
        invalidatesTags: ['Cases'],
        query: ({title,mediator,category,sub_category,problem_brief, access})=>{

          return {
            url:'/session/case/create_case_and_groups/',
            body:{
              title: title,
              mediator:mediator,
              category:category,
              sub_category:sub_category,
              problem_brief:problem_brief,
              summary:null,
              is_active:true,
            },
          //   headers:{
          //     Authorization: `JWT ${access}`
          // },
          method: 'POST'
          }
        }
      }),

      putUserToMemberGroup: builder.mutation({
        query: ({user,access,idCase,side})=>{
          return{
            url: `/session/chat_members/get_group_member_by_user/?case=${idCase}&side=${side}`,
            body: {
              user:user.id
            },
            headers:{
                Authorization: `JWT ${access}`
            },
            method:'PUT'
          }
        }
      }),
      getCaseSide: builder.query({
        query: ({caseId, user,access})=>{
          return{
            url:'/session/chat_members/get_side_by_id/',
            params:{
              user:user,
              case:caseId
            },
            // headers:{
            //   Authorization: `JWT ${access}`
            // },
            method:'GET'
          }
        }

      }),
      getMyCases: builder.query({ //this is the updated method to get cases
        providesTags:['Cases'],
        query: ({id, access, isMediator,open_close})=>{
          const url = isMediator?'/session/case/get_open_close_cases/':'/session/chat_members/get_open_close_case_by_user/'
          return{
            url:url,
            method:'GET',
            params:{
              id:id,
              open_close:open_close,
            },
            // headers: {
            //   Authorization: `JWT ${access}`,
            // },

          }
        }
      }),
      closeCase: builder.mutation({
        invalidatesTags:['Cases'],
        query:({caseId, summary})=>{
            const currentDateTime = new Date().toISOString()
            return{
                url:`/session/case/${caseId}/`,
                method:'PATCH',
                body:{
                    close_at:currentDateTime,
                    is_active:false,
                    summary:summary,
                }
            }
        }
    }),
    
    getFullUsersByCase: builder.query({
      providesTags:['users_case'],
      query: ({caseId})=>{
        return{
          url:'/session/chat_members/get_full_users_by_case/',
          method:'GET',
          params:{
            case:caseId,
          }
        }
      }
    }),
    postNewSurvey: builder.mutation({
      invalidatesTags:['Cases'],
      query:({note,case_rate,user_id,case_id})=>{
        return{
          url:'/session/survey/',
          method:'POST',
          body:{
            note:note,
            case_rate:case_rate,
            user:user_id,
            case:case_id
          }
        }
      }
    }),
    deleteCase: builder.mutation({
      invalidatesTags:['Cases'],
      query:({caseId})=>{
        return{
          url:'session/case/delete_case/',
          method:'DELETE',
          params:{
            caseId:caseId
          }

        }
      }
    })
    
    }
  }
});

export  {caseApi};