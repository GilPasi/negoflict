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
import { msgReducer, postNewMessage, clearMsg } from "./slices/msgSlice";
import { msgApi } from "./api/msgApi"; 
import { mediatorApi } from "./api/mediatorApi";
import { perticipentReducer, addPerticipents,clearAllPerticipents,removeParticepent,setOnlineUsers,setUserAttribute } from "./slices/perticipentSlice";
import { chat_attrbuteReducer, setMediator, setStartChat } from "./slices/chatAttributeSlice";
import { superUserApi } from "./api/superUserApi";


const store = configureStore({
    reducer:{
        user: userReducer,
        pos: positionReducer,
        groups: groupsReducer,
        chat_groups: chatGroupsReducer,
        chat:chatReducer,
        message:msgReducer,
        perticipent:perticipentReducer,
        chat_attrbute:chat_attrbuteReducer,

        [usersApi.reducerPath]: usersApi.reducer,
        [caseApi.reducerPath]: caseApi.reducer,
        [groupApi.reducerPath]: groupApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [msgApi.reducerPath]: msgApi.reducer,
        [mediatorApi.reducerPath]: mediatorApi.reducer,
        [superUserApi.reducerPath]: superUserApi.reducer,
        
    },
    middleware: getDefaultMiddleware =>{
        return getDefaultMiddleware().concat(usersApi.middleware)
        .concat(caseApi.middleware)
        .concat(groupApi.middleware)
        .concat(adminApi.middleware)
        .concat(msgApi.middleware)
        .concat(mediatorApi.middleware)
        .concat(superUserApi.middleware)
        
    }
    
});


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
    setPrivateGroup,
    clearMsg,
    removeParticepent,
    clearAllPerticipents,
    addPerticipents,
    setUserAttribute,
    setOnlineUsers,
    setMediator,
    setStartChat,
    

   
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
export const {useGetMyMediatorQuery,useLazyGetMyMediatorQuery} = usersApi
//===========

//caseApi=====
export const {useGetMyCasesQuery, useLazyGetMyCasesQuery} = caseApi
export const { usePost_new_caseMutation } = caseApi
export const {useGetCaseSideQuery, useLazyGetCaseSideQuery} = caseApi
export const { usePutUserToMemberGroupMutation } = caseApi
export const {useCloseCaseMutation} = caseApi
export const {useGetUsersByCaseQuery} = caseApi
export const {useGetFullUsersByCaseQuery} = caseApi
//============

//groupApi=====
export const { useGetGroupsByUserQuery, useLazyGetGroupsByUserQuery} = groupApi
export const { useCreateNewGroupMutation } = groupApi
export const {useGetChatGroupsQuery,useLazyGetChatGroupsQuery} = groupApi
export const {useDeleteGroupMutation} = groupApi

//adminApi=======
export const { useRegisterToChatGroupsMutation } = adminApi
export const { useRegisterUsersMutation } = adminApi
export const { useAddMediatorMutation } = adminApi
export const {useGetAddressesQuery,useLazyGetAddressesQuery} = adminApi
export const {useAddResidentMutation} = adminApi
export const {useUpdateMediatorResidentMutation} = adminApi
export const {useIsUsernameExistQuery, useLazyIsUsernameExistQuery} = adminApi
export const {useRegisterOneUserMutation} = adminApi
export const {useCreateUsersMutation} = adminApi
export const {useAddingManyUsersToOneChatGroupMutation} = adminApi
export const {useRegisterManyUsersToGroupMemberMutation} = adminApi

//msgApi=======
export const {usePostNewMessageMutation} = msgApi
//=============

//mediatorApi========
export const {useGet_clientsQuery,useLazyGet_clientsQuery} = mediatorApi
export const {useGetContactsQuery,useLazyGetContactsQuery} = mediatorApi
export const {useCreateContactMutation} = mediatorApi

//superUserAi========
export const {useGetMediatorsQuery,useLazyGetMediatorsQuery} = superUserApi