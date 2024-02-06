import { Link } from 'react-router-dom';
import './ProductTile.css';

function ProductTile({ product }){


    return (
        <div id='product-tile'>

            <Link id="link-image" key={product.id} to={`/products/${product.id}`} >
                <div id="image-container">
                    <img src={product.image} id='product-img'/>
                </div>
            </Link>

            <div id="description-section">
                 <div id='tile-bottom'>
                    <Link key={product.id} to={`/products/${product.id}`} id='link-product-title'>
                        <div id="product-title">{product.title}</div>
                    </Link>
                    <div id="product-tile-price">${product.price}</div>
                </div>
            </div>

        </div>
    )
}

export default ProductTile;
