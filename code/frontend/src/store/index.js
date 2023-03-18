import { configureStore } from "@reduxjs/toolkit";
import { userReducer,login, logout, updateAccessToken } from './slices/userSlice'
import { positionReducer,updatePosition } from "./slices/psitionSlice";
import { save, erase, tempUserReducer } from "./slices/tempUserSlice";


const store = configureStore({
    reducer:{
        user: userReducer,
        pos: positionReducer,
        tempUser: tempUserReducer
    }
})

export{
    store,
    login,
    logout,
    updateAccessToken,
    updatePosition,
    save,
    erase,
}
