const LOAD_ALL_PRODUCTS = "spots/loadAllProducts";
//const GET_PRODUCT_DETAILS = "spots/getProductDetails"
const POST_A_PRODUCT = 'spots/postAProduct';

const loadAllProducts = (allProducts) => {
    return {
      type: LOAD_ALL_PRODUCTS,
      allProducts
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
      console.log('allSpots after fetch', allSpots)
      dispatch(loadAllProducts(allSpots));
      return allSpots;
    } else  {
      console.log('/api/products error output');
    }
};

// export const thunkPostAProduct = (product) => async (dispatch) => {
//   //we get back the {} with details of the newly created Product
//   const res = await fetch(`/api/products/new`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(product)
//   });

//   if(res.ok) {
//     const productData = await res.json();
//     console.log('ProductData', productData);
//     dispatch(postAProduct(productData));
//     return productData;
//   } else  {
//     console.log('inside thunkPostAProduct error message');
//     const error = await res.json();
//     console.log('error', error);
//     return error;  //if not successful, return the error data back
//   }
// }



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
    // case POST_A_PRODUCT: {

    // }
    default:
      return state;
  }
};

export default productsReducer;
