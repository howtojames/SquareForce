import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './ProductDetails.css';
import { thunkGetAllProducts, thunkGetProductDetails } from '../../redux/product';
import { thunkPostACartProduct, thunkDeleteACartProduct } from '../../redux/cartproduct';
import UpdateProduct from '../UpdateProduct/UpdateProduct';

function ProductDetails () {
    let { productId } = useParams();
    productId = parseInt(productId);
    console.log('productId', productId);

    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

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


    const onAdd = async (e) => {
        e.preventDefault();

        //CartProduct Form only has one attribute
        const cartProductData = {
            quantity: quantity
        }
        await dispatch(thunkPostACartProduct(productId, cartProductData));
        navigate('/shopping-cart');
    }

    //console.log("quantity", quantity)
    return (
        <main id='page-container'>
            <div id='left-container'>
                <img src={productData.image} width="300px"/>
            </div>
            <div id='right-container'>
                {/* details */}

                <div id="title">{productData.title}</div>
                <div>Condition: {productData.condition}</div>
                <div>${productData.price}</div>
                <div>{productData.description}</div>

                <div>
                    <label>Quantity</label>
                    <input type='number'
                    onChange={e => setQuantity(e.target.value)}
                    value={quantity} />
                </div>
                <button onClick={onAdd}>Add to cart</button>
            </div>
        </main>
    )
}

export default ProductDetails;
