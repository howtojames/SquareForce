import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetAllProducts } from '../../redux/product';
import ProductTile from '../ProductTile/ProductTile';
import Footer from '../Footer/Footer';
import './HomePage.css';

//linking the css from the package for the slideshow
import 'react-slideshow-image/dist/styles.css';
//we use the slide effect
import { Fade, Zoom, Slide } from 'react-slideshow-image';


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


    //slideImage array
    const slideImages = [
        {
            url: "../images/ad-1.png"
        },
        {
            url: "../images/ad-2.png"
        },
        {
            url: "../images/ad-3.png"
        },
        {
            url: "../images/ad-4.png"
        },
        {
            url: "../images/ad-5.png"
        }

    ];
    // const divStyle = {
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     height: '280px',
    //     backgroundSize: 'cover'
    // };



    return (
        <>
            <div>
                <div id="slideshow-container">
                    {/* testing for dist directory*/}
                    {/* ../../../public/images/ad-1.png */}
                    {/* out one and into images directory */}


                    {/* <img id="ad-image" src="../images/ad-1.png" alt="Ad Image 1" /> */}
                    <Slide>
                        {slideImages.map((image, index) => (
                           <div key={index}>
                                <div id="ad-image" style={{backgroundImage: `url(${image.url})`}}>

                                </div>
                           </div>
                        ))}
                    </Slide>

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
