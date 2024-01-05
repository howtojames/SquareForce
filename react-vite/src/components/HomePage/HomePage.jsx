import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetAllProducts } from '../../redux/product';

function HomePage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(thunkGetAllProducts())
    }, [dispatch])

    const allProductsObj = useSelector(state => state.product)
    console.log("allProductsObj", allProductsObj)
    if (!allProductsObj) return null;
    const allProductsArr = Object.values(allProductsObj)
    console.log("allProductsArr", allProductsArr)


    return (
        <>
            <h3>Home Page</h3>
            <div>Daily Deals</div>

            {allProductsArr.map(product => (
                <>
                    <div id="product-container" key={product.id}>
                        {product.name}
                    </div>
                    <div>${product.price}</div>
                </>
            ))}
        </>
    )
}

export default HomePage;
