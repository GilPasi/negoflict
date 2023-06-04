import { createSlice } from "@reduxjs/toolkit";


const msgSlice = createSlice({
    name:'message',
    initialState:{
        time:'',
        ext:{
            side:'',
            color:0,
            name:'',
            userId:'',
            sender:''
        },
        msg:'',
        to:'',
     
       
    },
    reducers:{
        postNewMessage:(state,action)=>{
           const {msg,to,ext,time} = action.payload
           const {side,color,name, userId, sender} = ext
           state.ext.color = color? color : 0//change this
           state.msg = msg
           state.ext.side = side
           state.to = to
           state.ext.name = name
           state.ext.userId = userId
           state.ext.sender = sender
           state.time = time
        },
        clearMsg: ()=>{
            return {
                ext:{
                    side:'',
                    color:0,
                    name:'',
                    userId:'',
                    sender:''
                },
                msg:'',
                to:'',
                time:'',
            }

        }
    },
    
})


export const msgReducer = msgSlice.reducer
export const {postNewMessage, clearMsg} = msgSlice.actions