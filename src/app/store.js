import { configureStore } from '@reduxjs/toolkit';
import videosReducer from '../features/Videos/VideosSlice';
import tagsReducer from '../features/Tags/TagsSlice';
import videoReducer from '../features/Video/VideoSlice';
import relatedVideosReducer from '../features/RelatedVideos/RelatedVideosSlice';

export const store = configureStore({
  reducer: {
    videos: videosReducer,
    tags: tagsReducer,
    video: videoReducer,
    relatedVideos: relatedVideosReducer
  },

});
