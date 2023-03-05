import {createSlice} from '@reduxjs/toolkit'



const userSlice   = createSlice({
    name: 'user',
    initialState: {
        id:null,
        username:'',
        email:'',
        refreshToken:'',
        accessToken:''
    },
    reducers: {
        updateAccessToken:(state,action)=>{
            state.accessToken = action.payload
        },
        login:(state,action)=>{
            const {id, username, email, refreshToken, accessToken} = action.payload
            state.id = id
            state.username = username
            state.email = email
            state.refreshToken = refreshToken
            state.accessToken = accessToken 
        },
        logout:(state,action)=>{
            state.id = null
            state.username = ''
            state.email = ''
            state.refreshToken = ''
            state.accessToken = ''
        }
        
    }
})



export const userReducer = userSlice.reducer
export const { login, logout, updateAccessToken } = userSlice.actions


