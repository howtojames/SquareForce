import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { NavLink } from "react-router-dom"
import './WatchListView.css';
import { thunkGetCurrentUserWatchlist } from "../../redux/watchlist";
import WatchListTile from "../WatchListTile/WatchlistTile";

function WatchListView(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetCurrentUserWatchlist())
    }, [dispatch]);

    const watchlistState = useSelector(state => state.watchlist)
    //console.log('watchlistState', watchlistState);
    const watchlistStateArr = Object.values(watchlistState);

    //console.log('watchlistStateArr', watchlistStateArr);

    return (
        <div id="watchlist-view-container">
            <div id='watchlist'>WatchList</div>
            <div>
                {watchlistStateArr.length === 0 ? (
                    <div id="empty-seller-page">
                        <div>You don&apos;t have any watchlist items. </div>
                        <NavLink to="/" id="start-a-listing">Head back to main page</NavLink>
                    </div>
                ) : (
                    watchlistStateArr.map((watchlist) => (
                        <WatchListTile key={watchlist.id} watchlist={watchlist}/>
                    ))
                )}

            </div>
        </div>
    )
}


export default WatchListView;

{/* <WatchListTile key={watchlist.id} watchlist={watchlist} /> */}
