import { Link } from 'react-router-dom';
import './ProductTile.css';

function ProductTile({ product }){

    console.log('product', product)
    console.log('product.imageUrl', product.imageUrl)


    return (
        <>
            <Link key={product.id} to={`/products/${product.id}`} id='product-link'>
                <div></div >
                <img src={product.image} width="200px" id='image'/>

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
