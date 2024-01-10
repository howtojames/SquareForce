import { Link } from 'react-router-dom';
import './ProductTile.css';

function ProductTile({ product }){

    //console.log('product', product)
    //console.log('product.imageUrl', product.imageUrl)
    return (
        <div id='product-tile'>
            <Link key={product.id} to={`/products/${product.id}`} id='product-image'>
                <div></div >
                <img src={product.image} height="200px" id='image'/>
            </Link>
                <div className='tile-bottom'>
                    <div className='tile-bottom-left'>
                        <Link key={product.id} to={`/products/${product.id}`} id='product-title'>
                        <div>{product.title}</div>
                        </Link>
                        <div>${product.price}</div>

                    </div>
                    <div className='tile-bottom-right'>
                    </div>
                </div>

        </div>
    )
}

export default ProductTile;
