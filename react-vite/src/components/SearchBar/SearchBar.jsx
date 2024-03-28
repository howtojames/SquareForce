import { useState, useEffect } from "react-redux";


function SearchBar() {
    const [query, setQuery] = useState('');

    //get a list of all products
    //then make a sogirotihm that
    //show s a list of any character strings that are matching

    return (
        <div id="search-bar-container">
            <div id="query-conainer">
                <label></label>
                <input type="text"></input>
            </div>
            <div id="search-button">Search</div>
        </div>
    )

}


export default SearchBar;
