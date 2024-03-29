import { useState, useEffect } from "react-redux";
import { thunkGetAllProducts } from '../../redux/product';
import { useDisaptch, useSelector } from 'react-redux';

function SearchBar() {
    const dispatch = useDisaptch();

    const [query, setQuery] = useState('');

    //get a list of all products
    //then make a sogirotihm that
    //show s a list of any character strings that are matching

    useEffect( () => {
        dispatch(thunkGetAllProducts());
    }, [dispatch]);

    const allProducts = useSelector(state => state.products);
    console.log("allProducts in Searchbar", allProducts);



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
