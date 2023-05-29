import { createSlice } from "@reduxjs/toolkit";



const chatSlice = createSlice({
    name: 'chat',
    initialState:{
        groupA: {
            id:'',
            messages:[],
            side:'A'
        },
        groupB: {
            id:'',
            messages:[],
            side:'B'
        },
        groupG: {
            id:'',
            messages:[],
            side:'G'
        },
    },
    reducers:{
        addGroupsProps: (state,action)=>{
            const {groups} = action.payload
            groups.forEach(group=>{
                Object.keys(state).forEach(groupKey=>{
                    if(groupKey.slice(-1) === group.groupname.slice(-1))
                        state[groupKey].id = group.groupid
                })
            })
        },
        updateMsg: (state,action)=>{
            const {id, message} = action.payload
            
            if(!message)return
            Object.keys(state).forEach(groupKey => {
                if (state[groupKey].id === id) {
                  state[groupKey].messages = [...state[groupKey].messages, message]
                }
              }); 
        },
        addHistoryMsg: (state,action)=>{
            const {id, messages } = action.payload
            if(!messages)return
            Object.keys(state).forEach(groupKey => {
                if (state[groupKey].id === id) {
                  state[groupKey].messages = messages
                }
              }); 


        },
        resetChatState: (state)=>{
            Object.keys(state).forEach(groupKey=>{
                state[groupKey].id = ''
                state[groupKey].messages = []
            })
        },
    }
})

export const chatReducer = chatSlice.reducer
export const {addGroupsProps,updateMsg,resetChatState,addHistoryMsg} = chatSlice.actions