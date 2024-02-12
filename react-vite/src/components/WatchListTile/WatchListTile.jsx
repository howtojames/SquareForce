import { Link, NavLink } from 'react-router-dom';
import './WatchListTile.css';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem.jsx';
import { thunkDeleteAWatchlistProduct } from '../../redux/watchlist.js';

//watchlist a watchlist product here
function WatchListTile({ watchlist }){
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    //console.log('watchlist product.id', watchlist.id)
    const watchlistId = watchlist.id

    const onDelete = async (e) => {
        e.preventDefault();

        //thunk takes in a watchlist product
        await dispatch(thunkDeleteAWatchlistProduct(watchlist.id));
    };

    return (
        <div id="sell-tile-container">
            <div id="sell-tile-left">
                <Link to={`/products/${watchlistId}`} id='product-image-link'>
                    <img id="selling-image" src={watchlist.product.image} />
                </Link>
            </div>


            <div id='sell-tile-middle'>
                <div className='tile-middle-top'>
                    <Link to={`/products/${watchlistId}`} id='product-image-title'>
                        <div id="sell-tile-title">{watchlist.product.title}</div>
                    </Link>
                </div>
                <div className='tile-middle-middle'>
                    <div>${watchlist.product.price}</div>
                </div>
            </div>

            <div id='tile-right'>
                <div onClick={onDelete} id="delete-product-button">Delete</div>
            </div>
        </div>
    )
}

export default WatchListTile;
