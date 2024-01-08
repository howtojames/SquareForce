import { Link } from 'react-router-dom';
import './ProductTile.css';

function ProductTile({ product }){

    console.log('product', product)

    return (
        <>
            <div>ProductTile</div>

            <Link key={product.id} to={`/products/${product.id}`} id='product-link'>
                <img src={product.previewImage} height="200px" id='image'/>
                <div className='tile-bottom'>
                    <div className='tile-bottom-left'>
                        <div>{product.title}</div>
                    </div>
                    <div className='tile-bottom-right'>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default ProductTile;
