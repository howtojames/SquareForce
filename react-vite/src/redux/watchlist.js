const GET_CURRENT_USER_WATCHLIST = "watchlist/getCurrentUserWatchlist";
const POST_A_WATCHLIST_PRODUCT = 'watchlist/postAWatchlistProduct';
const DELETE_A_WATCHLIST_PRODUCT = 'watchlist/deleteAWatchlistProduct';


const getCurrentUserWatchlist = (watchlist) => {
    return {
      type: GET_CURRENT_USER_WATCHLIST,
      watchlist
    }
};

const postAWatchlistProduct = (watchlistProduct) => {
    return {
      type: POST_A_WATCHLIST_PRODUCT,
      watchlistProduct
    };
};


const deleteAWatchlistProduct = (watchlistProductId) => {
return {
    type: DELETE_A_WATCHLIST_PRODUCT,
    watchlistProductId
};
}

export const thunkGetCurrentUserWatchlist = () => async (dispatch) => {
    // URL: /api/watchlist/current
    const res = await fetch(`/api/watchlist/current`);

    if(res.ok) {
        const watchlist = await res.json();
        console.log('watchlist in thunk', watchlist);
        dispatch(getCurrentUserWatchlist(watchlist));
        return watchlist;
    } else  {
        console.log('/api/watchlist/current error output');
    }
};


//we use productId here, to create a Watchlist with the assotiated Product
export const thunkPostAWatchlistProduct = (productId) => async (dispatch) => {
    const res = await fetch(`/api/watchlist/${productId}`, {
        method: 'POST',
    });

    if(res.ok) {
        const watchlistProduct = await res.json();
        console.log('watchlistProduct in thunkPostAWatchlistProduct', watchlistProduct);
        dispatch(postAWatchlistProduct(watchlistProduct));
        return watchlistProduct;
    } else  {
        const error = await res.json();
        console.log('thunkPostAWatchlistProduct error message', error);
        return error;
    }
}


//we use cartProductId here to query for the cartProduct we want to delete
export const thunkDeleteAWatchlistProduct = (watchlistProductId) => async (dispatch) => {
    const res = await fetch(`/api/watchlist/${watchlistProductId}`, {
      method: 'DELETE'
    });

    if(res.ok) {
      const watchlistProductData = await res.json();
      dispatch(deleteAWatchlistProduct(watchlistProductId))
      return watchlistProductData;
    } else {
      const error = await res.json();
      console.log("thunkDeleteAWatchlistProduct error message", error)
    }
}


const initialState = {};

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER_WATCHLIST: {
      const newState = {}; //always start with empty state
      action.watchlist.forEach((product) => newState[product.id] = product);
      console.log("newState in reducer", newState);
      return newState;
    }
    case POST_A_WATCHLIST_PRODUCT: {
      return { ...state, [action.watchlistProduct.id]: action.watchlistProduct }
    }
    case DELETE_A_WATCHLIST_PRODUCT: {
      const newState = { ...state };
      //syntax to delete an key:value pair from an newState object
      delete newState[action.watchlistProductId]
      return newState;
    }
    default:
      return state;
  }
};

export default watchlistReducer;
