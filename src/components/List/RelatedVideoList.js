import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRelatedVideos } from '../../features/RelatedVideos/RelatedVideosSlice';
import Loading from '../UI/Loading';
import RelatedSingleVideo from './RelatedSingleVideo';

const RelatedVideoList = ({currentVideoId,tags}) => {
    const dispatch = useDispatch();

    const {relatedVideos,loading,isError,error} = useSelector(state => state.relatedVideos)

    useEffect(() => {

        dispatch(fetchRelatedVideos({tags,id:currentVideoId}))

    },[dispatch,tags,currentVideoId])


    let content;

    if (loading) {
        content = <Loading />
    }

    if (!loading && isError) {
        content = <p>{error}</p>
    }

    if (!loading && !isError && relatedVideos.length === 0) {
        content = <p>No related Videos Found</p>

    }
    if (!loading && !isError && relatedVideos.length > 0) {
        content = relatedVideos.map(video => <RelatedSingleVideo key={video.id} video={video} />)

    }

    return (
        <div
            className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto"
        >
            
           {content}
        </div>
    );
};

export default RelatedVideoList;