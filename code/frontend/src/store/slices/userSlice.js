import {createSlice} from '@reduxjs/toolkit'



const userSlice   = createSlice({
    name: 'user',
    initialState: {
        id:null,
        username:'',
        firstName:'',
        email:'',
        accessToken:null,
        role: null,
    },
    reducers: {
        updateAccessToken:(state,action)=>{
            state.accessToken = action.payload
        },
        login:(state,action)=>{
            const {id, username, email, accessToken, role, firstName} = action.payload
            state.id = id
            state.username = username
            state.email = email
            state.accessToken = accessToken
            state.role = role
            state.firstName = firstName
        },
        logout:(state,action)=>{
            state.id = null
            state.username = ''
            state.email = ''
            state.accessToken = null
            state.role = null
            state.firstName = ''
        }
        
    }
})



export const userReducer = userSlice.reducer
export const { login, logout, updateAccessToken } = userSlice.actions


