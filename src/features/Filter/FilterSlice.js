import {  createSlice } from "@reduxjs/toolkit"


const initialState = {
    tags:[],
    searchText:'',

}


// async thunk function


const filterSlice = createSlice({
    name: 'filter',
    initialState,
  
    reducers:{

        tagSelected:(state,action) => {
            state.tags.push(action.payload)

        },
        tagRemoved:(state,action) => {
            state.tags = state.tags.filter(tag => tag !== action.payload)
        },

        searched:(state,action) => {
            state.searchText = action.payload
        }
    }
    
})



export const  {tagSelected,tagRemoved,searched} = filterSlice.actions
export default filterSlice.reducer;