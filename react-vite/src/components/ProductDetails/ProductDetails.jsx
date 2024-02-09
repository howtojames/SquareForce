import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './ProductDetails.css';
import { thunkGetAllProducts, thunkGetProductDetails } from '../../redux/product';
import { thunkPostACartProduct, thunkGetCurrentUserCartProducts } from '../../redux/cartproduct';
import ReviewsView from '../ReviewsView/ReviewsView';

function ProductDetails () {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    let { productId } = useParams();
    productId = parseInt(productId);
    console.log('productId', productId);


    const [quantity, setQuantity] = useState(1);
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        dispatch(thunkGetAllProducts());
        dispatch(thunkGetProductDetails(productId));
        dispatch(thunkGetCurrentUserCartProducts());
    }, [dispatch, productId]);

    useEffect(() => {
        const errors = {};
        if(quantity < 1) errors.quantity = "Invalid value"
        setValidationErrors(errors);
    }, [quantity])



    //user check
    const sessionUser = useSelector(state => state.session.user);

    let loggedIn = false;
    if(sessionUser && Object.values(sessionUser).length > 0){
        loggedIn = true;
    } else {
        loggedIn = false;
    }


    const cartProductState = useSelector(state => state.cartProduct);
    console.log("cartProductState", cartProductState)
    const cartProductsArr = Object.values(cartProductState)
    console.log("cartProductsArr", cartProductsArr)


    let productInCart = false;
    const item = cartProductsArr.find(cartProduct => cartProduct.product.id === productId)
    if(item)
        productInCart = true;
    else
        productInCart = false;




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
        //we pass in productId to query for the Product
        //to store in CartProduct in the database
        await dispatch(thunkPostACartProduct(productId, cartProductData));
        navigate('/shopping-cart');
    }


    const onViewInCart = async (e) => {
        e.preventDefault();

        navigate('/shopping-cart');
    }


    //console.log("quantity", quantity)
    return (
        <>
            <div id='details-page-container'>

                <div id='left-container'>
                    <div id="details-image-container">
                        <img id="details-product-img" src={productData.image} width="300px"/>
                    </div>
                </div>

                <div id='right-container'>
                    {/* details here*/}

                    <div id="details-title">{productData.title}</div>
                    <div>Condition: {productData.condition}</div>
                    <div>${productData.price}</div>
                    <div>{productData.description}</div>

                    {loggedIn && (
                        <div>
                            <label id="quantity-label">Quantity</label>
                            <input id="quantity-input" min="1"
                            type='number'
                            onChange={e => setQuantity(e.target.value)}
                            value={quantity} />
                            <span className='post-product-error' id="detail-quantity-error">{validationErrors.quantity && `${validationErrors.quantity}`}</span>
                        </div>
                    )}


                    {/* looks ok */}
                    {loggedIn && (
                        productInCart === true ? (
                            <button onClick={onViewInCart} className="product-details-button">View in Cart</button>
                        ) : (
                            <button onClick={onAdd} className="product-details-button">Add to cart</button>
                        )
                    )}
                </div>


            </div>

            <ReviewsView productId={productId} productData={productData}/>
        </>
    )
}

export default ProductDetails;
