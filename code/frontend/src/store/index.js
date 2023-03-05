import { configureStore } from "@reduxjs/toolkit";
import { userReducer,login, logout, updateAccessToken } from './slices/userSlice'



const store = configureStore({
    reducer:{
        user: userReducer,
    }
})

export{
    store,
    login,
    logout,
    updateAccessToken
}
