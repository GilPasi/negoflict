import { createSlice } from "@reduxjs/toolkit";


const msgSlice = createSlice({
    name:'message',
    initialState:{
        ext:{
            side:'',
            color:0,
            name:'',
            userId:'',
        },
        msg:'',
        to:'',
     
       
    },
    reducers:{
        postNewMessage:(state,action)=>{
            console.log('in slice')
           const {msg,to,ext} = action.payload
           const {side,color,name, userId} = ext
           state.ext.color = color? color : 0//change this
           state.msg = msg
           state.ext.side = side
           state.to = to
           state.ext.name = name
           state.ext.userId = userId
        }
    }
})


export const msgReducer = msgSlice.reducer
export const {postNewMessage} = msgSlice.actions