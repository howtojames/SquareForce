import { useParams, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './ProductDetails.css';
import { thunkGetProductDetails } from '../../redux/product';
import UpdateProduct from '../UpdateProduct/UpdateProduct';

function ProductDetails () {
    let { productId } = useParams();
    productId = parseInt(productId);
    console.log('productId', productId);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetProductDetails(productId));
    }, [dispatch, productId]);


    const productObj = useSelector(state => state.product);

    console.log('productObj', productObj)

    const productArr = Object.values(productObj);
    console.log("productArr", productArr);
    const productData = productArr[productId - 1] //productId - 1
    console.log('productData', productData)

    if (!productObj || !productArr || !productData ) return null;



    return (
        <main id='page-container'>
            <NavLink to={`/products/update/${productId}`}>
                Revise listing
            </NavLink>
            <div id='left-container'>
                {/* images */}
                <div>left-container</div>
                <img src={productData.image} width="300px"/>
            </div>
            <div id='right-container'>
                {/* details */}
                <div>right-container</div>
                <div>{productData.title}</div>
                <div>{productData.condition}</div>
                <div>{productData.price}</div>
                <div>{productData.description}</div>

            </div>
        </main>
    )
}

export default ProductDetails;
