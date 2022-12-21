import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getVideo } from "./VideoApi";


const initialState = {
    video: {},
    loading: false,
    isError: false,
    error: ''
}


// async thunk function

export const fetchVideo = createAsyncThunk("video/fetchVideo", async (id) => {
    const video = await getVideo(id);
    return video;
})


const videoSlice = createSlice({
    name: 'video',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchVideo.pending,(state,action)=>{
            state.loading = true;
            state.isError = false;
            
        })

        builder.addCase(fetchVideo.fulfilled,(state,action)=>{
            state.loading = false;
            state.video = action.payload;
        })

        builder.addCase(fetchVideo.rejected,(state,action)=>{
            state.loading= false;
            state.isError = true;
            state.error = action.error?.message;
            state.video = {}


        })
    }
})




export default videoSlice.reducer;