import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getTags } from "./TagsApi"

const initialState = {
    tags: [],
    loading: false,
    isError: false,
    error: ''
}


// async thunk function

export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
    const tags = await getTags();
    return tags;
})


const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchTags.pending,(state,action)=>{
            state.loading = true;
            state.isError = false;
            
        })

        builder.addCase(fetchTags.fulfilled,(state,action)=>{
            state.loading = false;
            state.tags = action.payload;
        })

        builder.addCase(fetchTags.rejected,(state,action)=>{
            state.loading= false;
            state.isError = true;
            state.error = action.error?.message;
            state.tags = [];


        })
    }
})




export default tagsSlice.reducer;