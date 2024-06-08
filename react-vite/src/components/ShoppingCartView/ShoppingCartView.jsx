import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import './ShoppingCartView.css';
import { thunkGetCurrentUserCartProducts, thunkDeleteACartProduct } from "../../redux/cartproduct";
import { thunkPostAnOrder } from "../../redux/order";
import { thunkPostAnOrderProduct } from "../../redux/orderproduct";
import ShoppingCartTile from "../ShoppingCartTile/ShoppingCartTile";



function ShoppingCartView(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(thunkGetCurrentUserCartProducts())
    }, [dispatch]);

    const cartProductState = useSelector(state => state.cartProduct)
    //console.log('cartProductState', cartProductState);
    const cartProductStateArr = Object.values(cartProductState);
    //console.log("cartProductStateArr", cartProductStateArr)

    let items = 0;
    let total = 0;
    for (let cartProduct of cartProductStateArr ){
        items += cartProduct.quantity;
        total += cartProduct.quantity * cartProduct.product.price;
    }

    const handleCheckout = async (e) => {
        e.preventDefault();

        const order = {
            total: total
        }

        //POST an order with details
        const placedOrder = await dispatch(thunkPostAnOrder(order));
        //console.log("placedOrder", placedOrder)  //checking the id

        //POST an OrderProduct for each cartProduct
        //delete all cart products
        for(let cartProduct of cartProductStateArr){
            //console.log("for each cartProduct in shopping cart", cartProduct)
            const orderProductData = {
                orderId: placedOrder.order.id,
                productId: cartProduct.product.id,
                quantity: cartProduct.quantity
            }
            //console.log("orderProductData", orderProductData);
            await dispatch(thunkPostAnOrderProduct(orderProductData)); //postAOrderProduct

            await dispatch(thunkDeleteACartProduct(cartProduct.id));
        }

        navigate('/orders');
    }

    const startShopping = () => {
        //don't want to stay on the same page
        navigate('/');
    }

    return (
        <div id="shopping-cart-view-container">
            <div id="shopping-cart-left">
                <div id="shopping-cart-text">Shopping Cart</div>

                {cartProductStateArr.length === 0 ? (
                    <div id="empty-shopping-cart">
                        <div>You don&apos;t have any items in your cart. Let&apos;s get shopping!</div>
                        <button onClick={startShopping}>Start Shopping</button>
                    </div>
                ) : (
                    cartProductStateArr.map((cartProduct) => (
                        //we pass in a cartProduct as prop
                        <ShoppingCartTile key={cartProduct.id} cartProduct={cartProduct} />
                    ))
                )}
            </div>

            <div id="shopping-cart-right">
                <button id="checkout-button" onClick={handleCheckout}>Checkout</button>
                <p id="items">
                    <div>Items ({items})</div>
                    <div>${total}</div>
                </p>
                <div id="grey-border"></div>
                <p id="subtotal">
                    <div>Subtotal</div>
                    <div>${total}</div>
                </p>

            </div>
        </div>
    )
}


export default ShoppingCartView;
