import { createSlice } from "@reduxjs/toolkit";


const positionSlice = createSlice({
    name:'position',
    initialState:{
        pos:2,
        privateGroup:'',
        activeGroup:'G'
    },
    reducers:{
        updatePosition:(state,action)=>{
            state.pos = action.payload
        },
        setPrivateGroup: (state,action)=>{
             state.privateGroup = action.payload
        },
        setActiveGroup: (state,action)=>{
            state.activeGroup = action.payload
        }


    }

    



})

export const positionReducer = positionSlice.reducer
export const {updatePosition, setPrivateGroup, setActiveGroup} = positionSlice.actions