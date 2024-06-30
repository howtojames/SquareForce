import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage/HomePage';
import PostProduct from '../components/PostProduct/PostProduct'
import ProductDetails from '../components/ProductDetails/ProductDetails';
import UpdateProduct from '../components/UpdateProduct/UpdateProduct';
import SellingView from '../components/SellingView/SellingView'
import ShoppingCartView from '../components/ShoppingCartView/ShoppingCartView';
import WatchListView from '../components/WatchListView/WatchListView';
import OrdersView from '../components/OrdersView/OrdersView';
import CheckoutPage from '../components/CheckoutPage/CheckoutPage';



export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products/:productId",
        element: <ProductDetails />,
      },
      {
        path: "/products/update/:productId",
        element: <UpdateProduct />,
      },
      {
        path: "/products/new",
        element: <PostProduct />,
      },
      {
        path: "/products/selling",
        element: <SellingView />
      },
      {
        path: "/watchlist",
        element: <WatchListView />
      },
      {
        path: "/shopping-cart",
        element: <ShoppingCartView />
      },
      {
        path: "/orders",
        element: <OrdersView />
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      //add change router here
      {
        path: "change-address",
        element: <CheckoutPage />
      },
    ],
  },
]);
