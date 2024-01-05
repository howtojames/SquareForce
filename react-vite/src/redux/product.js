const LOAD_ALL_PRODUCTS = "spots/loadAllProducts";

const loadAllProducts = (allProducts) => {
    return {
      type: LOAD_ALL_PRODUCTS,
      allProducts
    };
};


export const thunkGetAllProducts = () => async (dispatch) => {
    const res = await fetch("/api/products");

    if(res.ok) {
      //{ Products: [ {}, {}, ... ]}
      const allSpots = await res.json();
      console.log('allSpots after fetch', allSpots)
      dispatch(loadAllProducts(allSpots));
      return allSpots;
    } else  {
      console.log('/api/products error output');
    }
};



const initialState = {};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_PRODUCTS: {
      const newState = { ...initialState };
      console.log('action.allProducts in reducer', action.allProducts)
      action.allProducts.forEach((product) => newState[product.id] = product);
      //console.log('newState', newState);
      return newState;
    }
    default:
      return state;
  }
};

export default productsReducer;
