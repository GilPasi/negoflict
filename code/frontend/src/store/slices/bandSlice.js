import { createSlice } from "@reduxjs/toolkit";



const BandSlice = createSlice({
    name:'band',
    initialState:{
        bandCase:false
    },
    reducers:{
        setBand: (state,action)=>{
            const {band_name, band_state} = action.payload 
            state[band_name] = band_state
        }
    }
})

export const BandReducer = BandSlice.reducer
export const {setBand} = BandSlice.actions 