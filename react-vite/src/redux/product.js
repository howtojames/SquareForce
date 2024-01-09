const LOAD_ALL_PRODUCTS = "spots/loadAllProducts";
const GET_PRODUCT_DETAILS = "spots/getProductDetails"
const POST_A_PRODUCT = 'spots/postAProduct';

const loadAllProducts = (allProducts) => {
    return {
      type: LOAD_ALL_PRODUCTS,
      allProducts
    };
};
const getProductDetails = (product) => {
  return {
    type: GET_PRODUCT_DETAILS,
    product
  };
};
const postAProduct = (productData) => {
  return {
    type: POST_A_PRODUCT,
    productData
  };
};

export const thunkGetAllProducts = () => async (dispatch) => {
    const res = await fetch("/api/products");

    if(res.ok) {
      //{ Products: [ {}, {}, ... ]}
      const allSpots = await res.json();
      console.log('all Products after fetch', allSpots)
      dispatch(loadAllProducts(allSpots));
      return allSpots;
    } else  {
      console.log('/api/products error output');
    }
};
export const thunkGetProductDetails = (productId) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}`);  //fetch

  if(res.ok) {
    const productDetails = await res.json();
    console.log('product details in thunk', productDetails);
    dispatch(getProductDetails(productDetails));
    return productDetails;
  } else  {
    console.log('/api/product/:productId error here');
  }
}


export const thunkPostAProduct = (product) => async (dispatch) => {
  //we get back the {} with details of the newly created Product
  const res = await fetch(`/api/products/new`, {
    method: 'POST',
    //headers: { 'Content-Type': 'application/json' }, //1:49:00
    body: product
  });

  if(res.ok) {
    const productData = await res.json();
    console.log('productData in thunk', productData);
    dispatch(postAProduct(productData));
    return productData;
  } else  {
    console.log('thunkPostAProduct error message');
    const error = await res.json();
    console.log('error', error);
    return error;
  }
}



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
    case GET_PRODUCT_DETAILS: {
      const newState = { ...state, [action.product.id]: action.product };
      return newState;
    }
    case POST_A_PRODUCT: {
      return { ...state, [action.productData.id]: action.productData }
    }

    default:
      return state;
  }
};

export default productsReducer;
