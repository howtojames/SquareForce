const GET_CURRENT_USER_CART_PRODUCTS = "cartProducts/getCurrentUserCartProducts";
const POST_A_CART_PRODUCT = 'cartproducts/postACartProduct';
const UPDATE_A_CART_PRODUCT = 'cartproducts/updateACartProduct';
const DELETE_A_CART_PRODUCT = 'cartProducts/deleteACartProduct';

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
const updateACartProduct = (cartProductData) => {
  return {
    type: UPDATE_A_CART_PRODUCT,
    cartProductData
  };
}
const deleteACartProduct = (cartProductId) => {
  return {
    type: DELETE_A_CART_PRODUCT,
    cartProductId
  };
}

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
//we use productId here, to create a cartProduct with the assotiated Product
//cartProduct here contains { quantity: ... }
export const thunkPostACartProduct = (productId, cartProduct) => async (dispatch) => {
  const res = await fetch(`/api/cart_products/${productId}`, {
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

//we use cartProductId here to query for the cartProduct we want to edit
//cartProduct here contains { quantity: ... }
export const thunkUpdateACartProduct = (cartProductId, cartProduct) => async (dispatch) => {
  const res = await fetch(`/api/cart_products/update/${cartProductId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cartProduct)
  });

  if(res.ok) {
    const cartProductData = await res.json();
    console.log('cartProductData in thunkUpdateACartProduct', cartProductData);
    dispatch(updateACartProduct(cartProductData));
    return cartProductData;
  } else  {
    const error = await res.json();
    console.log('thunkPostAProduct error message', error);
    return error;
  }
}

//we use cartProductId here to query for the cartProduct we want to delete
export const thunkDeleteACartProduct = (cartProductId) => async (dispatch) => {
  const res = await fetch(`/api/cart_products/${cartProductId}`, {
    method: 'DELETE'
  });

  if(res.ok) {
    const cartProductData = await res.json();
    dispatch(deleteACartProduct(cartProductId))
    return cartProductData;
  } else {
    const error = await res.json();
    console.log("thunkDeleteACartProduct error message", error)
  }
}


const initialState = {};

const cartProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER_CART_PRODUCTS: {
      const newState = { ...state };
      action.currentUserCartProducts.forEach((cartProduct) => newState[cartProduct.id] = cartProduct);
      return newState;
    }
    case POST_A_CART_PRODUCT: {
      return { ...state, [action.cartProductData.id]: action.cartProductData }
    }
    case UPDATE_A_CART_PRODUCT: {
      return { ...state, [action.cartProductData.id]: action.cartProductData }
    }
    case DELETE_A_CART_PRODUCT: {
      const newState = { ...state };
      //syntax to delete an key:value pair from an newState object
      delete newState[action.cartProductId]
      return newState;
    }
    default:
      return state;
  }
};

export default cartProductsReducer;
