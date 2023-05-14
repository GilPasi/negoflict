import { createSlice } from "@reduxjs/toolkit";


const perticipentSlice = createSlice({
    name:'perticipent',
    initialState: [],

    reducers:{
        addPerticipents:(state,action)=>{
            console.log('peeeerr',action.payload)
            return [...state,...action.payload]
        },
        clearAllPerticipents:()=>{
            return []
        },
        removeParticepent:(state,action)=>{
            return state.filter(user=>user.id!==action.payload)
        },
        removeParticepentByAgoraName:(state,action)=>{
            return state.filter(user=>user.agoraUsername !== action.payload)

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
        },
        addNewParticipent: (state,action)=>{
            return [...state,action.payload]
        }
    }
})

export const perticipentReducer = perticipentSlice.reducer
export const {addPerticipents,clearAllPerticipents,removeParticepent,setUserAttribute,setOnlineUsers, addNewParticipent,removeParticepentByAgoraName } = perticipentSlice.actions