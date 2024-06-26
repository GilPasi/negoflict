import {createSlice} from '@reduxjs/toolkit'
import { setMediator } from './chatAttributeSlice'



const userSlice   = createSlice({
    name: 'user',
    initialState: {
        id:null,
        username:'',
        first_name:'',
        last_name:'',
        email:'',
        access:null,
        role: null,
        mediator: null,
    },
    reducers: {
        updateAccessToken:(state,action)=>{
            state.access = action.payload
        },
        login:(state,action)=>{
            const {id, username, email, access, role, first_name, last_name} = action.payload
            state.id = id
            state.username = username
            state.email = email
            state.access = access
            state.role = role
            state.first_name = first_name
            state.last_name = last_name
        },
        logout:(state,action)=>{
            state.id = null
            state.username = ''
            state.email = ''
            state.access = null
            state.role = null
            state.first_name = ''
            state.last_name = ''
        },
        setMediatorName:(state,action)=>{
            state.mediator = action.payload
        }
       
        
    }
})



export const userReducer = userSlice.reducer
export const { login, logout, updateAccessToken, setMediatorName } = userSlice.actions


