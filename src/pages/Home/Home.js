import React from 'react';
import VideoGrid from '../../components/Grid/VideoGrid';
import Tags from '../../components/Tags/Tags';
import Pagination from '../../components/UI/Pagination';

const Home = () => {
   
    return (
        <>

            <Tags />
            <VideoGrid />
            <Pagination />


        </>
    );
};

export default Home;