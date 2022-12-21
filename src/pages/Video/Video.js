import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RelatedVideoList from '../../components/List/RelatedVideoList';
import Player from '../../components/SingleVideo/Player';
import VideoDescription from '../../components/SingleVideo/VideoDescription';
import { fetchVideo } from '../../features/Video/VideoSlice';
import { useParams } from 'react-router-dom';
import Loading from '../../components/UI/Loading';

const Video = () => {

    const dispatch = useDispatch();

    const { video, loading, isError, error } = useSelector(state => state.video);

    const { videoId } = useParams();


    useEffect(() => {

        dispatch(fetchVideo(videoId))

    }, [dispatch, videoId])

    // decide what to render
    let content;

    if (loading) {
        content = <Loading />
    }

    if (!loading && isError) {
        content = <p>{error}</p>
    }

    if (!loading && !isError && !video?.id) {
        content = <p>No video Found</p>

    }
    if (!loading && !isError && video?.id) {
        content = <div className="grid grid-cols-3 gap-2 lg:gap-8">

            <div className="col-span-full w-full space-y-8 lg:col-span-2">
                <Player link={video.link} title={video.title}/>

                <VideoDescription video={video} />

            </div>

            <RelatedVideoList currentVideoId={video.id} tags={video.tags} />



        </div>

    }


    return (
        <>
            <section className="pt-6 pb-20">
                <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">

                    {content}
                    
                </div>
            </section>


        </>
    );
};

export default Video;