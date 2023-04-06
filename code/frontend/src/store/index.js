import { configureStore } from "@reduxjs/toolkit";
import { userReducer,login, logout, updateAccessToken } from './slices/userSlice'
import { positionReducer,updatePosition } from "./slices/psitionSlice";
import { groupsReducer,addGroups } from "./slices/groupsSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { usersApi } from "./api/usersApi";
import { caseApi } from './api/caseApi'
import { groupApi } from "./api/groupApi";



const store = configureStore({
    reducer:{
        user: userReducer,
        pos: positionReducer,
        groups: groupsReducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [caseApi.reducerPath]: caseApi.reducer,
        [groupApi.reducerPath]: groupApi.reducer,
        
    },
    middleware: getDefaultMiddleware =>{
        return getDefaultMiddleware().concat(usersApi.middleware)
        .concat(caseApi.middleware)
        .concat(groupApi.middleware)
    }
    
})

export{
    store,
    login,
    logout,
    updateAccessToken,
    updatePosition,
    addGroups,
   
}

setupListeners(store.dispatch)


//userApi=====
export const { useLoginQuery, useLazyLoginQuery } = usersApi
export const { useIs_loginQuery, useLazyIs_loginQuery} = usersApi
export const { useLog_outQuery, useLazyLog_outQuery} = usersApi
export const { useGetNewAccessQuery, useLazyGetNewAccessQuery} = usersApi
export const { useGetTokenQuery, useLazyGetTokenQuery} = usersApi
//===========

//caseApi=====
export const { useGet_my_casesQuery, useLazyGet_my_casesQuery } = caseApi
export const { usePost_new_caseMutation } = caseApi
//============

//groupApi=====
export const { useGetGroupsByUserQuery, useLazyGetGroupsByUserQuery} = groupApi
export const { useCreateNewGroupMutation } = groupApi
