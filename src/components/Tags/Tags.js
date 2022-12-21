import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTags } from '../../features/Tags/TagsSlice';
import Loading from '../UI/Loading';
import Tag from './Tag';

const Tags = () => {

    const dispatch = useDispatch();
    const { tags, loading, error, isError } = useSelector((state) => state.tags);

    useEffect(() => {

        dispatch(fetchTags())

    }, [dispatch])

    // descide what to render
     // descide what to render
     let content;
     if(loading){
         content = <Loading/>
 
     }
     if(!loading && isError){
      
         content = <div className="col-span-12">{error}</div>
     }
 
     if(!isError && !loading && tags.length > 0){
         content = tags.map((tag) =>
         <Tag key={tag.id} tag={tag} />)
     }


    return (
        <section>
            <div
                className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 border-b overflow-y-auto"
            >
                {content}
            </div>
        </section>
    );
};

export default Tags;