import { configureStore } from "@reduxjs/toolkit";
import { userReducer,login, logout, updateAccessToken } from './slices/userSlice'
import { positionReducer,updatePosition } from "./slices/psitionSlice";
import { groupsReducer,addGroups } from "./slices/groupsSlice";


const store = configureStore({
    reducer:{
        user: userReducer,
        pos: positionReducer,
        groups: groupsReducer,
        
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
