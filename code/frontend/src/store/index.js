import { configureStore } from "@reduxjs/toolkit";
import { userReducer,login, logout, updateAccessToken } from './slices/userSlice'
import { positionReducer,updatePosition, setPrivateGroup } from "./slices/psitionSlice";
import { groupsReducer,addGroups } from "./slices/groupsSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { usersApi } from "./api/usersApi";
import { caseApi } from './api/caseApi'
import { groupApi } from "./api/groupApi";
import { chatGroupsReducer, addChatGroups, removeChatGroups } from "./slices/chatGroupsSlice";
import  {adminApi} from "./api/adminApi";
import { chatReducer, addGroupsProps, updateMsg, resetChatState, addHistoryMsg } from "./slices/chatSlice";
import { msgReducer, postNewMessage } from "./slices/msgSlice";
import { msgApi } from "./api/msgApi"; 


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
        [msgApi.reducerPath]: msgApi.reducer,
        
    },
    middleware: getDefaultMiddleware =>{
        return getDefaultMiddleware().concat(usersApi.middleware)
        .concat(caseApi.middleware)
        .concat(groupApi.middleware)
        .concat(adminApi.middleware)
        .concat(msgApi.middleware)
        
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
    setPrivateGroup

   
}

setupListeners(store.dispatch)


//userApi=====
export const { useLoginQuery, useLazyLoginQuery } = usersApi
export const { useIs_loginQuery, useLazyIs_loginQuery} = usersApi
export const { useLog_outQuery, useLazyLog_outQuery} = usersApi
export const { useGetNewAccessQuery, useLazyGetNewAccessQuery} = usersApi
export const { useGetTokenQuery, useLazyGetTokenQuery} = usersApi
export const {useGetChatTokenQuery, useLazyGetChatTokenQuery} = usersApi
export const {useChangePasswordMutation} = usersApi
export const {useModifyUserMutation} = usersApi
//===========

//caseApi=====
export const { useGet_my_casesQuery, useLazyGet_my_casesQuery } = caseApi
export const { usePost_new_caseMutation } = caseApi
export const {useGetCaseSideQuery, useLazyGetCaseSideQuery} = caseApi
export const { usePutUserToMemberGroupMutation } = caseApi
//============

//groupApi=====
export const { useGetGroupsByUserQuery, useLazyGetGroupsByUserQuery} = groupApi
export const { useCreateNewGroupMutation } = groupApi
export const {useGetChatGroupsQuery,useLazyGetChatGroupsQuery} = groupApi

//adminApi=======
export const { useRegisterToChatGroupsMutation } = adminApi
export const { useRegisterUsersMutation } = adminApi
export const { useAddMediatorMutation } = adminApi
export const {useGetAddressesQuery,useLazyGetAddressesQuery} = adminApi
export const {useAddResidentMutation} = adminApi
export const {useUpdateMediatorResidentMutation} = adminApi
export const {useIsUsernameExistQuery, useLazyIsUsernameExistQuery} = adminApi

//msgApi=======
export const {usePostNewMessageMutation} = msgApi
