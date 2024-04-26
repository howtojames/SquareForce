import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetAllProducts } from '../../redux/product';
import ProductTile from '../ProductTile/ProductTile';
import Footer from '../Footer/Footer';
import './HomePage.css';


function HomePage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(thunkGetAllProducts())
    }, [dispatch])

    const allProductsObj = useSelector(state => state.product)
    //console.log("allProductsObj", allProductsObj)
    if (!allProductsObj) return null;
    const allProductsArr = Object.values(allProductsObj)
    //console.log("allProductsArr", allProductsArr)

    //recently viewed
    //queue, with each node being an object of the product viewed

    return (
        <>
            <div>
                <div id="slideshow-container">
                    {/* testing for dist directory*/}
                    {/* ../../../public/images/ad-1.png */}
                    {/* out one and into images directory */}
                    <img id="ad-image" src="../images/ad-1.png" alt="Ad Image 1" />
                </div>
               {/*  <div className="slide fade">
                    <img src="image2.jpg" alt="Ad Image 2" />
                </div> */}
            </div>

            <div id="products-title">Products</div>
            <main id="main-container">

                {/* add recently viewed */}
                {/* need queue */}
                {/* <div id="recently-viewed-label">Recently Viewed</div> */}
                {/*

                */}

                <div id="page-container">
                    <div id="all-products-container">


                        {allProductsArr.map(product => (
                            <ProductTile key={product.id} product={product}/>
                        ))}
                    </div>
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default HomePage;
