import { createSlice } from "@reduxjs/toolkit";


const groupsSlice = createSlice({
    name: 'groups',
    initialState:{
        groups:[]
    },
    reducers:{
        addGroups:(state,action)=>{
            state.groups = [...action.payload].sort((a,b)=>
                a.groupname.localeCompare(b.groupname)
            )}
    }
})

export const groupsReducer = groupsSlice.reducer
export const {addGroups} = groupsSlice.actions