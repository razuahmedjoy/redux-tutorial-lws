import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searched } from '../../features/Filter/FilterSlice';
import {useMatch, useNavigate} from 'react-router-dom'
const Search = () => {

    const {searchText} = useSelector(state => state.filter);
    const [input,setInput] = useState(searchText);

    const dispatch = useDispatch()

    const match = useMatch("/");
    const navigate = useNavigate()
    console.log(match);

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(searched(input));

        // if user not in homepage redirect to homepage
        if(!match){
            navigate("/")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="outline-none border-none mr-2"
                type="search"
                name="search"
                placeholder="Search"
                value={input}
                onChange={(e) => setInput(e.target.value)}

            />
        </form>
    );
};

export default Search;