import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetAllProducts } from '../../redux/product';
import ProductTile from '../ProductTile/ProductTile';
import './HomePage.css';


function HomePage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(thunkGetAllProducts())
    }, [dispatch])

    const allProductsObj = useSelector(state => state.product)
    console.log("allProductsObj", allProductsObj)
    if (!allProductsObj) return null;
    const allProductsArr = Object.values(allProductsObj)
    //console.log("allProductsArr", allProductsArr)


    return (
        <>
            <div id="daily-deals">Daily Deals</div>
            <div id="page-container">

                <div id="all-products-container">
                    {allProductsArr.map(product => (
                        <ProductTile key={product.id} product={product}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default HomePage;
