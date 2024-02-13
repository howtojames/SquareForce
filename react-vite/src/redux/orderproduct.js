const GET_CURRENT_USER_ORDER_PRODUCTS = 'orderProducts/getCurrentUserOrderProducts';
const POST_AN_ORDER_PRODUCT = 'ordersProducts/postAnOrderProduct';


const getCurrentUserOrderProducts = (orderProducts) => {
    return {
      type: GET_CURRENT_USER_ORDER_PRODUCTS,
      orderProducts
    }
};


const postAnOrderProduct = (orderProduct) => {
    return {
        type: POST_AN_ORDER_PRODUCT,
        orderProduct
    };
};



export const thunkGetCurrentUserOrderProducts = () => async (dispatch) => {
    // URL: /api/orders/current
    const res = await fetch(`/api/order_products/current`);

    if(res.ok) {
      const orderProducts = await res.json();
      //console.log('currentUserorders in thunk', orders);
      dispatch(getCurrentUserOrderProducts(orderProducts));
      return orderProducts;
    } else  {
      console.log('/api/order_products/current error output');
    }
};

export const thunkPostAnOrderProduct = (orderProduct) => async (dispatch) => {
    const res = await fetch(`/api/order_products/new`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderProduct)
    });

    if(res.ok) {
      const orderProduct = await res.json();
      /* we return order and cartProduct */
      console.log('thunkPostAOrderProduct', orderProduct);
      dispatch(postAnOrderProduct(orderProduct));
      return orderProduct;
    } else  {
      const error = await res.json();
      console.log('thunkPostAnOrderProduct error message', error);
      return error;
    }
}


const initialState = {};

const orderProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER_ORDER_PRODUCTS: {
      const newState = {}; //always start with empty state
      action.orderProducts.forEach((orderProduct) => newState[orderProduct.id] = orderProduct);
      //console.log("newState in reducer", newState);
      return newState;
    }
    case POST_AN_ORDER_PRODUCT: {
      return { ...state, [action.orderProduct.id]: action.orderProduct }
    }
    default:
      return state;
  }
};

export default orderProductsReducer;
