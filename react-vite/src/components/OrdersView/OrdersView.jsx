import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom"
import { thunkGetCurrentUserOrders } from "../../redux/order.js"
import { thunkGetCurrentUserOrderProducts } from "../../redux/orderproduct.js"

import './OrdersView.css';



function OrdersView(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetCurrentUserOrders());
        dispatch(thunkGetCurrentUserOrderProducts());
    }, [dispatch]);

    const orderState = useSelector(state => state.order)
    //console.log('orderState', orderState);
    const orderStateArr = Object.values(orderState);
    //console.log('orderStateArr', orderStateArr);

    const orderProductState = useSelector(state => state.orderProduct)
    //console.log('orderProductState', orderProductState);
    const orderProductStateArr = Object.values(orderProductState);
    //console.log('orderProductStateArr', orderProductStateArr);

    return (
        <div id="selling-view-container">
            <div id='orders'>Orders</div>
            <div>
                {orderStateArr.length === 0 ? (
                    <div id="empty-seller-page">
                        <div>You don't have any Orders.</div>
                        <NavLink to="/" id="start-a-listing">Head back to main page</NavLink>
                    </div>
                ) : (
                    orderStateArr.map((order) => (
                        <div id="order-container">
                            <div id="order-upper-container">
                                <div id="status">Order Placed</div>
                                <div id="order-total">&bull; Order Total: US ${order.total}</div>
                                <div id="order-number">&bull; Order Number: {order.id}</div>
                            </div>

                            {orderProductStateArr.filter(orderProduct => orderProduct.orderId === order.id).map(orderProduct => (
                                    <div id="sell-tile-container">
                                    <div id="sell-tile-left">
                                        <Link to={`/products/${orderProduct.product.id}`} id='product-image-link'>
                                            <img id="selling-image" src={orderProduct.product.image} />
                                        </Link>
                                    </div>


                                    <div id='sell-tile-middle'>
                                        <div className='tile-middle-top'>
                                            <Link to={`/products/${orderProduct.product.id}`} id='product-image-title'>
                                                <div id="sell-tile-title">{orderProduct.product.title}</div>
                                            </Link>
                                        </div>
                                        <div className='tile-middle-middle'>
                                            <div>${orderProduct.product.price}</div>
                                            <div>Quantity: {orderProduct.quantity}</div>
                                        </div>
                                    </div>

                                    <div id='tile-right'>
                                        {/* <div onClick={onDelete} id="delete-product-button">Delete</div> */}
                                    </div>
                                </div>


                            ))}



                        </div>
                    ))

                )}

            </div>
        </div>
    )
}


export default OrdersView;
