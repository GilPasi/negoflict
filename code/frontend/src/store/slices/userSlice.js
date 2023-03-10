import {createSlice} from '@reduxjs/toolkit'



const userSlice   = createSlice({
    name: 'user',
    initialState: {
        id:null,
        username:'',
        email:'',
        refreshToken:null,
        accessToken:null,
        role: null,
    },
    reducers: {
        updateAccessToken:(state,action)=>{
            state.accessToken = action.payload
        },
        login:(state,action)=>{
            const {id, username, email, refreshToken, accessToken, role} = action.payload
            state.id = id
            state.username = username
            state.email = email
            state.refreshToken = refreshToken
            state.accessToken = accessToken
            state.role = role 
        },
        logout:(state,action)=>{
            state.id = null
            state.username = ''
            state.email = ''
            state.refreshToken = null
            state.accessToken = null
            state.role = null
        }
        
    }
})



export const userReducer = userSlice.reducer
export const { login, logout, updateAccessToken } = userSlice.actions


