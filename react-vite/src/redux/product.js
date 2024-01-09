const LOAD_ALL_PRODUCTS = "products/loadAllProducts";
const GET_PRODUCT_DETAILS = "products/getProductDetails"
const POST_A_PRODUCT = 'products/postAProduct';
const UPDATE_A_PRODUCT = 'products/updateAProduct';

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
const updateAProduct = (productData) => {
  return {
    type: UPDATE_A_PRODUCT,
    productData
  };
};


export const thunkGetAllProducts = () => async (dispatch) => {
    const res = await fetch("/api/products");

    if(res.ok) {
      //{ Products: [ {}, {}, ... ]}
      const allProducts = await res.json();
      console.log('all Products after fetch', allProducts)
      dispatch(loadAllProducts(allProducts));
      return allProducts;
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
    console.log('productData in thunkPostAproduct', productData);
    dispatch(postAProduct(productData));
    return productData;
  } else  {
    console.log('thunkPostAProduct error message');
    const error = await res.json();
    console.log('error', error);
    return error;
  }
}
export const thunkUpdateAProduct = (productId, product) => async (dispatch) => {
  //Method: PUT
  const res = await fetch(`/api/products/update/${productId}`, {
    method: 'PUT',
    //headers: { 'Content-Type': 'application/json' },
    body: product
  });

  if(res.ok) {
    const productData = await res.json();
    console.log('updateAProduct thunk productData res', productData);
    dispatch(updateAProduct(productData));
    return productData;
  } else {
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
    case UPDATE_A_PRODUCT: {
      return { ...state, [action.productData.id]: action.productData }
    }

    default:
      return state;
  }
};

export default productsReducer;
