import { Link } from 'react-router-dom';
import './ProductTile.css';

function ProductTile({ product }){


    return (
        <div id='product-tile'>

            <Link id="link" key={product.id} to={`/products/${product.id}`} >
                <div id="image-section">
                    <img src={product.image} id='product-image'/>
                </div>
            </Link>

            <div id="description-section">
                 <div className='tile-bottom-left'>
                    <Link key={product.id} to={`/products/${product.id}`} id='product-title'>
                        <div id="product-tile-title">{product.title}</div>
                    </Link>
                    <div id="product-tile-price">${product.price}</div>
                </div>
            </div>






        </div>
    )
}

export default ProductTile;
