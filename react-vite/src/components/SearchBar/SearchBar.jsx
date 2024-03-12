import { useState, useEffect } from "react-redux";


function SearchBar() {
    const [query, setQuery] = useState('');

    return (
        <div id="search-bar-container">
            <div></div>
            <div id="search-button">Search</div>
        </div>
    )

};


export default SearchBar;
