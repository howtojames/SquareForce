const GET_CURRENT_USER_ORDERS = 'orders/getCurrentUserOrders';
const POST_AN_ORDER = 'orders/postAnOrder';


const getCurrentUserOrders = (orders) => {
    return {
      type: GET_CURRENT_USER_ORDERS,
      orders
    }
};

const postAnOrder = (order) => {
    return {
        type: POST_AN_ORDER,
        order
    };
};

export const thunkGetCurrentUserOrders = () => async (dispatch) => {
    // URL: /api/orders/current
    const res = await fetch(`/api/orders/current`);

    if(res.ok) {
      const orders = await res.json();
      //console.log('currentUserorders in thunk', orders);
      dispatch(getCurrentUserOrders(orders));
      return orders;
    } else  {
      console.log('/api/orders/current error output');
    }
};



export const thunkPostAnOrder = (order) => async (dispatch) => {
    const res = await fetch(`/api/orders/new`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });

    if(res.ok) {
      const order = await res.json();
      /* we return order and cartProduct */
      //console.log('two-part order in thunkPostAorder', order);
      /* two slices of order being passed back by the route */
      dispatch(postAnOrder(order));
      return order;
    } else  {
      const error = await res.json();
      console.log('thunkPostAnOrder error message', error);
      return error;
    }
}



const initialState = {};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER_ORDERS: {
      const newState = {}; //always start with empty state
      action.orders.forEach((order) => newState[order.id] = order);
      //console.log("newState in reducer", newState);
      return newState;
    }
    case POST_AN_ORDER: {
      return { ...state, [action.order.id]: action.order }
    }
    default:
      return state;
  }
};

export default ordersReducer;
