import { configureStore } from "@reduxjs/toolkit";
import { userReducer,login, logout, updateAccessToken,setMediatorName } from './slices/userSlice'
import { positionReducer,updatePosition, setPrivateGroup,setActiveGroup } from "./slices/psitionSlice";
import { groupsReducer,addGroups } from "./slices/groupsSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { usersApi } from "./api/usersApi";
import { caseApi } from './api/caseApi'
import { groupApi } from "./api/groupApi";
import { chatGroupsReducer, addChatGroups, removeChatGroups,addCaseId } from "./slices/chatGroupsSlice";
import  {adminApi} from "./api/adminApi";
import { chatReducer, addGroupsProps, updateMsg, resetChatState, addHistoryMsg } from "./slices/chatSlice";
import { msgReducer, postNewMessage, clearMsg } from "./slices/msgSlice";
import { msgApi } from "./api/msgApi"; 
import { mediatorApi } from "./api/mediatorApi";
import { perticipentReducer, addPerticipents,clearAllPerticipents,removeParticepent,setOnlineUsers,setUserAttribute, addNewParticipent,removeParticepentByAgoraName } from "./slices/perticipentSlice";
import { chat_attrbuteReducer, setMediator, setStartChat } from "./slices/chatAttributeSlice";
import { superUserApi } from "./api/superUserApi";
import { BandReducer, setBand } from "./slices/bandSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { jwtMiddleware } from './jwtRefetch';
import {searchMsgReducer,clearSearchMsg,setSearchMsg} from './slices/searchMsgSlice'

const userPersistConfig = {
    key: 'user',
    storage,
  };


  const persistedUserReducer = persistReducer(userPersistConfig, userReducer);


  
  const rootReducer = {
    user: persistedUserReducer, 
    position: positionReducer,
    groups: groupsReducer,
    chat_groups: chatGroupsReducer,
    chat: chatReducer,
    message: msgReducer,
    perticipent: perticipentReducer,
    chat_attrbute: chat_attrbuteReducer,
    band: BandReducer,
    searchMsg: searchMsgReducer,
  
    [usersApi.reducerPath]: usersApi.reducer,
    [caseApi.reducerPath]: caseApi.reducer,
    [groupApi.reducerPath]: groupApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [msgApi.reducerPath]: msgApi.reducer,
    [mediatorApi.reducerPath]: mediatorApi.reducer,
    [superUserApi.reducerPath]: superUserApi.reducer,
  };
  
  
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({ serializableCheck: false })
        .concat(usersApi.middleware)
        .concat(caseApi.middleware)
        .concat(groupApi.middleware)
        .concat(adminApi.middleware)
        .concat(msgApi.middleware)
        .concat(mediatorApi.middleware)
        .concat(superUserApi.middleware)
        .concat(jwtMiddleware)
    },
  });

export const persistor = persistStore(store);


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
    addNewParticipent,
    setBand,
    removeParticepentByAgoraName,
    addCaseId,
    setActiveGroup,
    setMediatorName,
    clearSearchMsg,
    setSearchMsg,
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
export const {useIsEmailExistQuery, useLazyIsEmailExistQuery} = usersApi
export const {useGetUserByAccessQuery,useLazyGetUserByAccessQuery} = usersApi
//===========

//caseApi=====
export const {useGetMyCasesQuery, useLazyGetMyCasesQuery} = caseApi
export const { usePost_new_caseMutation } = caseApi
export const {useGetCaseSideQuery, useLazyGetCaseSideQuery} = caseApi
export const { usePutUserToMemberGroupMutation } = caseApi
export const {useCloseCaseMutation} = caseApi
export const {usePostNewSurveyMutation} = caseApi
export const {useDeleteCaseMutation} = caseApi
//============

//groupApi=====
export const { useGetGroupsByUserQuery, useLazyGetGroupsByUserQuery} = groupApi
export const { useCreateNewGroupMutation } = groupApi
export const {useGetChatGroupsQuery,useLazyGetChatGroupsQuery} = groupApi
export const {useDeleteGroupMutation} = groupApi

//adminApi=======
export const {useGetFullUsersByCaseQuery} = adminApi
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
export const {useSetUserCaseAttributeMutation} = adminApi
export const {useGetUsersByCaseQuery} = adminApi
export const {useDeleteAgoraUserMutation} = adminApi
export const {useDeleteUserIfErrorMutation} = adminApi
export const {useChangeUserSideMutation} = adminApi


//msgApi=======
export const {usePostNewMessageMutation} = msgApi
//=============

//mediatorApi========
export const {useGet_all_usersQuery, useLazyGet_all_usersQuery} = mediatorApi
export const {useGet_clientsQuery,useLazyGet_clientsQuery} = mediatorApi
export const {useGetContactsQuery,useLazyGetContactsQuery} = mediatorApi
export const {useCreateContactMutation} = mediatorApi
export const {useRemoveContactMutation} = mediatorApi
export const {useGetMyAddressQuery,useLazyGetMyAddressQuery} = mediatorApi

//superUserAi========
export const {useGetMediatorsQuery,useLazyGetMediatorsQuery} = superUserApi
export const {useDeleteMediatorMutation} = superUserApi
export const {useChanging_userPasswordMutation} = superUserApi
export const {useChangeFirstLoginMutation} = superUserApi
export const {useGetUserByIdQuery, useLazyGetUserByIdQuery} = superUserApi
export const {useGetThemAllQuery,useLazyGetThemAllQuery} = superUserApi