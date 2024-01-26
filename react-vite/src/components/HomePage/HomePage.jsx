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
            <div>
                <div id="slideshow-container">
                    <img id="ad-image" src="../../../public/images/ad-1.png" alt="Ad Image 1" />
                </div>
               {/*  <div className="slide fade">
                    <img src="image2.jpg" alt="Ad Image 2" />
                </div> */}
            </div>

            <div id="products-title">Products</div>
            <main id="main-container">

                <div id="page-container">
                    <div id="all-products-container">


                        {allProductsArr.map(product => (
                            <ProductTile key={product.id} product={product}/>
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}

export default HomePage;
