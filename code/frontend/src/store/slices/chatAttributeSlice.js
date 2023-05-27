import { createSlice } from "@reduxjs/toolkit";



const ChatAttributeSlice = createSlice({
    name:'chat_attrbute',
    initialState:{
        mediator:{
            name:'',
            startChat:false
        }
    },
    reducers:{
        setMediator:(state,action)=>{
            state.mediator.name = action.payload
        },
        setStartChat:(state,action)=>{
            state.mediator.startChat = action.payload
        },

    }
})

export const chat_attrbuteReducer = ChatAttributeSlice.reducer
export const {setMediator,setStartChat} = ChatAttributeSlice.actions