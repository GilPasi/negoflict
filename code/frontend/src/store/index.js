import { configureStore } from "@reduxjs/toolkit";
import { userReducer,login, logout, updateAccessToken } from './slices/userSlice'
import { positionReducer,updatePosition } from "./slices/psitionSlice";
import { groupsReducer,addGroups } from "./slices/groupsSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { usersApi } from "./api/usersApi";



const store = configureStore({
    reducer:{
        user: userReducer,
        pos: positionReducer,
        groups: groupsReducer,
        [usersApi.reducerPath]: usersApi.reducer,
        
    },
    middleware: getDefaultMiddleware =>{
        return getDefaultMiddleware().concat(usersApi.middleware)
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
export const {useGetNewAccessQuery, useLazyGetNewAccessQuery} = usersApi
//===========
