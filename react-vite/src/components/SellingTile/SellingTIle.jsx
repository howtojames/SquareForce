import { Link, NavLink } from 'react-router-dom';
import './SellingTile.css';
import { useState, useEffect, useRef } from 'react';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem.jsx';
import DeleteProductModal from '../DeleteProductModal/DeleteProductModal.jsx';

function SellingTile({ product }){
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    console.log('sellingTile product.id', product.id)
    const productId = product.id


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

    return (
        <div id="sell-tile-container">
            <div id="tile-left">
                <Link to={`/products/${productId}`} id='product-image-link'>
                    <img src={product.image} width="150px" id='image'/>
                </Link>
            </div>


            <div id='sell-tile-middle'>
                <div className='tile-middle-top'>
                    <Link to={`/products/${productId}`} id='product-image-title'>
                        <div id="sell-tile-title">{product.title}</div>
                    </Link>
                </div>
                <div className='tile-middle-middle'>
                    <div>${product.price}</div>
                </div>
            </div>

            <div id='tile-right'>
                <NavLink id="revise-listing-button" to={`/products/update/${product.id}`}>Revise listing</NavLink>
                <div id="delete-product-button">  {/* pass in props for spot.id */}
                    <OpenModalMenuItem
                    id="delete-modal"
                    itemText="Delete"
                    onItemClick={closeMenu}
                    modalComponent={<DeleteProductModal productId={product.id}/>}
                    />
                </div>
            </div>
        </div>
    )
}

export default SellingTile;
