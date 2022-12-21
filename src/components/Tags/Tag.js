import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tagRemoved, tagSelected } from '../../features/Filter/FilterSlice';

const Tag = ({ tag }) => {

    const dispatch = useDispatch();
    const { tags: selectedTags } = useSelector(state => state.filter);

    const toggleTag = (tag) => {

        if (selectedTags.includes(tag)) {
            dispatch(tagRemoved(tag));
        } else {
            dispatch(tagSelected(tag));
        }
    }
    
    const isSelected = selectedTags.includes(tag.title) ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600';

    return (
        <div
            onClick={() => toggleTag(tag.title)}

            className={`px-4 py-1 rounded-full cursor-pointer ${isSelected}`}>
            {tag.title}
        </div>

        // <div
        //     className="bg-blue-600 text-white px-4 py-1 rounded-full cursor-pointer">
        //     redux
        // </div>
    );
};

export default Tag;