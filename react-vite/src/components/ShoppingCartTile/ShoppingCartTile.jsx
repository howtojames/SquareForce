import { Link, NavLink } from 'react-router-dom';
import './ShoppingCartTile.css';
import { useDispatch } from 'react-redux';
import { thunkDeleteACartProduct, thunkGetCurrentUserCartProducts } from '../../redux/cartproduct.js';
import { useState, useEffect, useRef } from 'react';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem.jsx';
import DeleteProductModal from '../DeleteProductModal/DeleteProductModal.jsx';

function ShoppingCartTile({ cartProduct }){
    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(cartProduct.quantity);

    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    console.log('cartProduct.product.id', cartProduct.product.id)
    const productId = cartProduct.product.id


    useEffect(() => {
        if (!showMenu) return;
        //if showMenu is true, we have a closeMenu
        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const onDelete = async (e) => {
        e.preventDefault();

        await dispatch(thunkDeleteACartProduct(cartProduct.id));
        await dispatch(thunkGetCurrentUserCartProducts());
    }



    return (
        <div id="sell-tile-container">
            <div id="tile-left">
                <img src={cartProduct.product.image} width="150px" id='image'/>
            </div>


            <div id='tile-middle'>
                <div className='tile-middle-top'>
                    <Link to={`/products/${productId}`} id='product-image-title'>
                        <div>{cartProduct.product.title}</div>
                    </Link>
                </div>
                <div className='tile-middle-middle'>
                    <div>${cartProduct.product.price}</div>
                </div>

            </div>
            <div className='tile-middle-2'>
                    <label>Quantity</label>
                    <input type='number'
                    onChange={e => setQuantity(e.target.value)} value={quantity} />
                </div>

            <div id='tile-right'>
                <div id="delete-product-button">
                    <button onClick={onDelete}>Remove</button>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCartTile;
