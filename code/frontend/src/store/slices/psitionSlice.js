import { createSlice } from "@reduxjs/toolkit";


const positionSlice = createSlice({
    name:'position',
    initialState:{
        pos:2
    },
    reducers:{
        updatePosition:(state,action)=>{
            state.pos = action.payload
        }
    }



})

export const positionReducer = positionSlice.reducer
export const {updatePosition} = positionSlice.actions