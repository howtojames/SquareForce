const GET_CURRENT_USER_CART_PRODUCTS = "cartProducts/getCurrentUserCartProducts";
const POST_A_CART_PRODUCT = 'cartproducts/postACartProduct';

const getCurrentUserCartProducts = (currentUserCartProducts) => {
    return {
      type: GET_CURRENT_USER_CART_PRODUCTS,
      currentUserCartProducts
    }
}
const postACartProduct = (cartProductData) => {
  return {
    type: POST_A_CART_PRODUCT,
    cartProductData
  };
};

export const thunkGetCurrentUserCartProducts = () => async (dispatch) => {
    const res = await fetch(`/api/cart_products/current`);

    if(res.ok) {
      const cartProductData = await res.json();
      console.log('productData in thunkGetCurrentUserCartProducts', cartProductData);
      dispatch(getCurrentUserCartProducts(cartProductData));
      return cartProductData;
    } else  {
      const error = await res.json();
      console.log('error', error);
      return error;
    }
}
export const thunkPostACartProduct = (cartProductId, cartProduct) => async (dispatch) => {
  const res = await fetch(`/api/cart_products/${cartProductId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cartProduct)
  });

  if(res.ok) {
    const cartProductData = await res.json();
    console.log('cartProductData in thunkPostACartProduct', cartProductData);
    dispatch(postACartProduct(cartProductData));
    return cartProductData;
  } else  {
    const error = await res.json();
    console.log('thunkPostAProduct error message', error);
    return error;
  }
}

export const thunkDeleteACartProduct = (cartProductId) => async (dispatch) => {
  //Method: PUT
  const res = await fetch(`/api/cart_products/${cartProductId}`, {
    method: 'DELETE'
  });

  if(res.ok) {
    const cartProductData = await res.json();
    return cartProductData;
  } else {
    const error = await res.json();
    console.log("error message", error)
  }
}


const initialState = {};

const cartProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER_CART_PRODUCTS: {
      const newState = {};  //so on first render we clear out the state first
      action.currentUserCartProducts.forEach((product) => newState[product.id] = product);
      return newState;
    }
    case POST_A_CART_PRODUCT: {
      return { ...state, [action.cartProductData.product.id]: action.cartProductData }
    }
    // case UPDATE_A_PRODUCT: {
    //   return { ...state, [action.productData.id]: action.productData }
    // }
    //no need for DELETE
    default:
      return state;
  }
};

export default cartProductsReducer;
