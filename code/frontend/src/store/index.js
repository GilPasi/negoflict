import { configureStore } from "@reduxjs/toolkit";
import { userReducer,login, logout, updateAccessToken } from './slices/userSlice'
import { positionReducer,updatePosition } from "./slices/psitionSlice";
import { groupsReducer,addGroups } from "./slices/groupsSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { usersApi } from "./api/usersApi";
import { caseApi } from './api/caseApi'
import { groupApi } from "./api/groupApi";
import { chatGroupsReducer, addChatGroups, removeChatGroups } from "./slices/chatGroupsSlice";
import  {adminApi} from "./api/adminApi";
import { chatReducer, addGroupsProps, updateMsg, resetChatState, addHistoryMsg } from "./slices/chatSlice";
import { msgReducer, postNewMessage } from "./slices/msgSlice";


const store = configureStore({
    reducer:{
        user: userReducer,
        pos: positionReducer,
        groups: groupsReducer,
        chat_groups: chatGroupsReducer,
        chat:chatReducer,
        message:msgReducer,

        [usersApi.reducerPath]: usersApi.reducer,
        [caseApi.reducerPath]: caseApi.reducer,
        [groupApi.reducerPath]: groupApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        
    },
    middleware: getDefaultMiddleware =>{
        return getDefaultMiddleware().concat(usersApi.middleware)
        .concat(caseApi.middleware)
        .concat(groupApi.middleware)
            .concat(adminApi.middleware)
    }
    
})

export{
    store,
    login,
    logout,
    updateAccessToken,
    updatePosition,
    addGroups,
    addChatGroups,
    removeChatGroups,
    addGroupsProps,
    updateMsg,
    resetChatState,
    addHistoryMsg,
    postNewMessage,

   
}

setupListeners(store.dispatch)


//userApi=====
export const { useLoginQuery, useLazyLoginQuery } = usersApi
export const { useIs_loginQuery, useLazyIs_loginQuery} = usersApi
export const { useLog_outQuery, useLazyLog_outQuery} = usersApi
export const { useGetNewAccessQuery, useLazyGetNewAccessQuery} = usersApi
export const { useGetTokenQuery, useLazyGetTokenQuery} = usersApi
export const {useGetChatTokenQuery, useLazyGetChatTokenQuery} = usersApi
//===========

//caseApi=====
export const { useGet_my_casesQuery, useLazyGet_my_casesQuery } = caseApi
export const { usePost_new_caseMutation } = caseApi
export const {useGetCaseSideQuery, useLazyGetCaseSideQuery} = caseApi
//============

//groupApi=====
export const { useGetGroupsByUserQuery, useLazyGetGroupsByUserQuery} = groupApi
export const { useCreateNewGroupMutation } = groupApi

//adminApi=======
export  const { useRegisterToChatGroupsMutation } = adminApi
export const { useRegisterUsersMutation } = adminApi
export const { usePutUserToMemberGroupMutation } = caseApi
