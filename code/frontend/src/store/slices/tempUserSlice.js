import { createSlice } from "@reduxjs/toolkit";


const tempUserSlice = createSlice({
    name: 'tempUser',
    initialState:[],
    reducers: {
        save: (state,action)=>{
            const user = action.payload
            const index = state.findIndex(user=>user.side === user.side)
            console.log(index)
            if(index !== -1){
                 state[index] = {...state[index],...user}
                 
            }
            else{
               state.push(user)

            }
           
        },
        erase: (state,action)=>{
             state = []
        }
        
    }
    
   
})


export const tempUserReducer = tempUserSlice.reducer
export const {save , erase} = tempUserSlice.actions