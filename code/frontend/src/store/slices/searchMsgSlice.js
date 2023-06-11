import { createSlice } from "@reduxjs/toolkit";


const searchMsgSlice = createSlice({
    name:'searchMsg',
    initialState: '',

    reducers:{
        setSearchMsg: (state, action) => {
            return action.payload
        },
        clearSearchMsg:()=>{
            return ''
        }
    }
})

export const searchMsgReducer = searchMsgSlice.reducer
export const {setSearchMsg,clearSearchMsg} = searchMsgSlice.actions