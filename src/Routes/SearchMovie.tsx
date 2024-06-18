import React from 'react'
import { useState } from 'react';

export default function SearchMovie() {
    const [searchInputText, setSearchInputText] = useState("");
    function handleSearchInput(e) {
        let lowerCase = e.target.value.toLowerCase();
        setSearchInputText(lowerCase);
    }
    return (
        <div>
            <label htmlFor="movie-search">Search the site:</label>
            <input type="search" id="movie-search" name="movie-search" onChange={handleSearchInput} />
        </div>
    )
}
