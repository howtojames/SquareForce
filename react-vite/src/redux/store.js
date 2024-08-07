import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import productsReducer from "./product";
import cartProductsReducer from "./cartproduct";
import reviewsReducer from './reviews';
import watchlistReducer from "./watchlist";
import ordersReducer from "./order";
import orderProductsReducer from "./orderproduct";
//no user here
const rootReducer = combineReducers({
  session: sessionReducer,
  product: productsReducer,
  cartProduct: cartProductsReducer,
  review: reviewsReducer,
  watchlist: watchlistReducer,
  order: ordersReducer,
  orderProduct: orderProductsReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
