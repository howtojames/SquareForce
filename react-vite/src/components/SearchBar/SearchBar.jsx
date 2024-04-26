import { useState, useEffect } from "react";
import { thunkGetAllProducts } from '../../redux/product';
import { useDispatch, useSelector } from 'react-redux';
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";

function SearchBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [query, setQuery] = useState('');

    //get a list of all products
    //then make a sogirotihm that
    //show s a list of any character strings that are matching

    useEffect( () => {
        dispatch(thunkGetAllProducts());
    }, [dispatch]);

    // const allProducts = useSelector(state => state.products);
    // const allProductsArr = Object.values(allProducts);
    // console.log("allProductsArr in Searchbar", allProductsArr);

    //might need to change to be be anywhere in the string
    //const filteredList = allProductsArr.filter(product => product.name === query);

    //get a list of all products
    const onClick = () => {
        window.alert("feature coming soon!");
    }

    return (
        <div id="search-bar-container">
            <div id="query-container">
                <label></label>
                <input id="search-bar-input"
                    type="text"
                    placeholder="Search for anything"
                    value={query}
                    onChange={e => setQuery(e.target.value)}>
                </input>
                {/* add icon in search */}
                {/* icon */}
                <button onClick={onClick} id="search-button">Search</button>
            </div>

        </div>
    )

}


export default SearchBar;
