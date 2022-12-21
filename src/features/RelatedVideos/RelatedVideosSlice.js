import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getRelatedVideos } from "./RelatedVideosApi";


const initialState = {
    relatedVideos: [],
    loading: false,
    isError: false,
    error: ''
}


// async thunk function

export const fetchRelatedVideos = createAsyncThunk("relatedVideos/fetchRelatedVideos", async ({tags,id}) => {
    const relatedVideos = await getRelatedVideos({tags,id});
    return relatedVideos;
})


const relatedVideosSlice = createSlice({
    name: 'relatedVideos',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchRelatedVideos.pending,(state,action)=>{
            state.loading = true;
            state.isError = false;
            
        })

        builder.addCase(fetchRelatedVideos.fulfilled,(state,action)=>{
            state.loading = false;
            state.relatedVideos = action.payload;
        })

        builder.addCase(fetchRelatedVideos.rejected,(state,action)=>{
            state.loading= false;
            state.isError = true;
            state.error = action.error?.message;
            state.relatedVideos = []


        })
    }
})




export default relatedVideosSlice.reducer;