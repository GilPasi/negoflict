import { createSlice } from "@reduxjs/toolkit";


const perticipentSlice = createSlice({
    name:'perticipent',
    initialState: [],

    reducers:{
        addPerticipents:(state,action)=>{
            return [...state,...action.payload]
        },
        clearAllPerticipents:()=>{
            return []
        },
        removeParticepent:(state,action)=>{
            state = state.filter(user=>user.uid!==action.payload)
        },
        setOnlineUsers: (state,action)=>{
            const onlineUsers = [...action.payload]

            onlineUsers.forEach(onlineUsers=>{
                for(let i=0; i<state.length ; i++ ){
                    if(state[i].agoraUsername === onlineUsers.uid){
                        state[i].connect = true
                    }
                }
                
            })
        },
        setUserAttribute: (state,action)=>{
            state.forEach(user=>{
                if(user.agoraUsername === action.payload.userId){
                    const change = action.payload.ext === 'online'?true:false
                    user.connect = change
                }
            })
        }
    }
})

export const perticipentReducer = perticipentSlice.reducer
export const {addPerticipents,clearAllPerticipents,removeParticepent,setUserAttribute,setOnlineUsers } = perticipentSlice.actions