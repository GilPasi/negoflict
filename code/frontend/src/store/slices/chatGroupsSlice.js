import { createSlice } from "@reduxjs/toolkit";



const chatGroupsSlice = createSlice({
    name: 'chat_groups',
    initialState: {
        chatGroups:[],
        caseId:''
    },
    reducers:{
        addChatGroups: (state,action)=>{
            state.chatGroups = [...action.payload]
        },
        removeChatGroups: (state,action)=>{
            return []
        },
    }
})

export const chatGroupsReducer = chatGroupsSlice.reducer
export const {addChatGroups,removeChatGroups} = chatGroupsSlice.actions