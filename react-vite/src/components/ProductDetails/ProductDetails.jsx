import { useParams, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './ProductDetails.css';
import { thunkGetAllProducts, thunkGetProductDetails } from '../../redux/product';
import UpdateProduct from '../UpdateProduct/UpdateProduct';

function ProductDetails () {
    let { productId } = useParams();
    productId = parseInt(productId);
    console.log('productId', productId);

    //user check
    const sessionUser = useSelector(state => state.session.user);

    let loggedIn = false;
    if(sessionUser && Object.values(sessionUser).length > 0){
        loggedIn = true;
    } else {
        loggedIn = false;
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(thunkGetAllProducts());
        dispatch(thunkGetProductDetails(productId));
    }, [dispatch, productId]);


    const productObj = useSelector(state => state.product);
    console.log('productObj', productObj)
    const productArr = Object.values(productObj);
    console.log("productArr", productArr);

    const productData = productArr.find(product => product.id === productId)
    console.log('productData', productData)

    if (!productObj || !productArr || !productData ) return null;

    return (
        <main id='page-container'>
            {/* {loggedIn && (
                <NavLink to={`/products/update/${productId}`}>
                    Revise listing
                </NavLink>
            )} */}


            <div id='left-container'>
                {/* images */}

                <img src={productData.image} width="300px"/>
            </div>
            <div id='right-container'>
                {/* details */}

                <div>{productData.title}</div>
                <div>{productData.condition}</div>
                <div>{productData.price}</div>
                <div>{productData.description}</div>

            </div>
        </main>
    )
}

export default ProductDetails;
