import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from '../../redux/actions/movieActions';

export const SearchView = ({ movies, onSearch, setSearchResult }) => {

    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchFilter = useSelector(state => state.movies.filter);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSearchSubmit = () => {
        if (inputValue) {
            dispatch(setFilter(inputValue));
            navigate(`/search`);
            setInputValue("");
        } else {
            alert("Please enter some text");
        }

    }

    return (
        <div className="d-flex">
            <div className="d-inline-flex">
                <input
                    type="text"
                    placeholder="Search..."
                    className="search search-bar form-input"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            handleSearchSubmit();
                        }
                    }}
                />
                <button className="search-btn" type="submit" onClick={() => {
                    handleSearchSubmit()
                }}>Search</button>
            </div>
        </div>
    );
};