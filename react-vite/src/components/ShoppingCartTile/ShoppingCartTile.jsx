import { Link} from 'react-router-dom';
import './ShoppingCartTile.css';
import { useDispatch } from 'react-redux';
import { thunkDeleteACartProduct, thunkGetCurrentUserCartProducts, thunkUpdateACartProduct } from '../../redux/cartproduct.js';
import { useState, useEffect } from 'react';
//import { useRef } from 'react';

function ShoppingCartTile({ cartProduct }){
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(cartProduct.quantity);
    const [validationErrors, setValidationErrors] = useState({});

    // const [showMenu, setShowMenu] = useState(false);
    // const ulRef = useRef();

    console.log('cartProduct.product.id', cartProduct.product.id)
    const productId = cartProduct.product.id


    // useEffect(() => {
    //     if (!showMenu) return;
    //     //if showMenu is true, we have a closeMenu
    //     const closeMenu = (e) => {
    //         if (!ulRef.current.contains(e.target)) {
    //         setShowMenu(false);
    //         }
    //     };

    //     document.addEventListener('click', closeMenu);

    //     return () => document.removeEventListener("click", closeMenu);
    // }, [showMenu]);

    // const closeMenu = () => setShowMenu(false);

    //update quantity state, and also in the backend
    useEffect(() => {
        const cartProductData = {
            quantity
        }
        dispatch(thunkUpdateACartProduct(cartProduct.id, cartProductData));
    }, [dispatch, quantity, cartProduct.id]) //cartProduct.id changes when we edit for a different tile

    //when quantity state is changed, send a thunk to change the cartproduct
    useEffect(() => {
        const errors = {};
        if (quantity <= 0) {
            errors['quantity'] = 'Invalid Quantity';
            console.log("Invalid Quantity")
        }
        setValidationErrors(errors);
    }, [dispatch, quantity]);


    const onDelete = async (e) => {
        e.preventDefault();

        //we use pass in cartProduct.id to find the cartProduct we want to delete
        await dispatch(thunkDeleteACartProduct(cartProduct.id));
        await dispatch(thunkGetCurrentUserCartProducts());
    }





    return (
        <div id="cart-tile-container">
            <div id="tile-left">
                <img src={cartProduct.product.image} width="150px" id='image'/>
            </div>


            <div id='cart-tile-description'>
                <div className='tile-middle-top'>
                    <Link to={`/products/${productId}`} id='cart-product-title'>
                        <div>{cartProduct.product.title}</div>
                    </Link>
                </div>
                <div className='tile-middle-middle'>
                    <div>${cartProduct.product.price}</div>
                </div>
            </div>


            <div id='cart-tile-right'>
                <div>
                    <label id="cart-quantity">Quantity</label>
                    <input id="cart-quantity-input" type='number' min="0"
                    onChange={(e) => setQuantity(e.target.value)} value={quantity} />
                    <div id='invalid-quantity'>
                        {validationErrors.quantity && `${validationErrors.quantity}`}
                    </div>
                </div>
                <div id="delete-product-button">
                    <button id="cart-remove-button" onClick={onDelete}>Remove</button>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCartTile;
