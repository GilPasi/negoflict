import { configureStore } from "@reduxjs/toolkit";
import { userReducer,login, logout, updateAccessToken } from './slices/userSlice'
import { positionReducer,updatePosition } from "./slices/psitionSlice";



const store = configureStore({
    reducer:{
        user: userReducer,
        pos: positionReducer
    }
})

export{
    store,
    login,
    logout,
    updateAccessToken,
    updatePosition
}
