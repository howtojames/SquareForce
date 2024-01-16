import { Link } from 'react-router-dom';
import './ProductTile.css';

function ProductTile({ product }){

    //console.log('product', product)
    //console.log('product.imageUrl', product.imageUrl)
    return (
        <div id='product-tile'>
            <Link key={product.id} to={`/products/${product.id}`} >
                <img src={product.image} id='product-image'/>
            </Link>
            <div className='tile-bottom'>
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
