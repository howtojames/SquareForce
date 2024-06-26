import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { NavLink } from "react-router-dom"
import './SellingView.css';
import { thunkGetCurrentUserProducts } from "../../redux/product";
import SellingTile from "../SellingTile/SellingTIle";

function SellingView(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetCurrentUserProducts())
    }, [dispatch]);

    const productState = useSelector(state => state.product)
    //console.log('productState', productState);
    const productStateArr = Object.values(productState);



    return (
        <div id="selling-view-container">
            <div id='selling'>Selling</div>
            <div>
                {productStateArr.length === 0 ? (
                    <div id="empty-seller-page">
                        <div>You don&apos;t have any active items.</div>
                        <NavLink to="/products/new" id="start-a-listing">Start a listing</NavLink>
                    </div>
                ) : (
                    productStateArr.map((product) => (
                        <SellingTile key={product.id} product={product} />
                    ))
                )}

            </div>
        </div>
    )
}


export default SellingView;
