import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"


import './ShoppingCartView.css';
import { thunkGetCurrentUserCartProducts } from "../../redux/cartproduct";
import ShoppingCartTile from "../ShoppingCartTile/ShoppingCartTile";



function ShoppingCartView(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetCurrentUserCartProducts())
    }, [dispatch]);

    const cartProductState = useSelector(state => state.cartProduct)
    console.log('cartProductState', cartProductState);
    const cartProductStateArr = Object.values(cartProductState);
    console.log("cartProductStateArr", cartProductStateArr)

    return (
        <div id="shopping-cart-view-container">
            <div id="shopping-cart-text">Shopping Cart</div>
            {cartProductStateArr.map((cartProduct) => (
                <ShoppingCartTile key={cartProduct.product.id} cartProduct={cartProduct} />
            ))}
        </div>
    )
}


export default ShoppingCartView;
