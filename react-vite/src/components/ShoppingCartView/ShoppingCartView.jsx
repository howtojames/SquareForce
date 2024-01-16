import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import './ShoppingCartView.css';
import { thunkGetCurrentUserCartProducts, thunkDeleteACartProduct } from "../../redux/cartproduct";
import ShoppingCartTile from "../ShoppingCartTile/ShoppingCartTile";



function ShoppingCartView(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(thunkGetCurrentUserCartProducts())
    }, [dispatch]);

    const cartProductState = useSelector(state => state.cartProduct)
    console.log('cartProductState', cartProductState);
    const cartProductStateArr = Object.values(cartProductState);
    console.log("cartProductStateArr", cartProductStateArr)

    let items = 0;
    let total = 0;
    for (let cartProduct of cartProductStateArr ){
        items += cartProduct.quantity;
        total += cartProduct.quantity * cartProduct.product.price;
    }

    const onDeleteAll = async (e) => {
        e.preventDefault();

        for(let cartProduct of cartProductStateArr ){
            await dispatch(thunkDeleteACartProduct(cartProduct.id));
        }
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
                        <div>You don't have any items in your cart. Let's get shopping!</div>
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
                <button id="checkout-button" onClick={onDeleteAll}>Checkout</button>
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
