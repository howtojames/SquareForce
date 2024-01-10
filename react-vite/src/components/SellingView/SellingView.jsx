import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { NavLink } from "react-router-dom"
import './SellingView.css';
import { thunkGetCurrentUserProducts } from "../../redux/product";
import SellingTile from "../SellingTile/SellingTIle";

function SellingView(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetCurrentUserProducts())
    }, []);

    const productState = useSelector(state => state.product)
    console.log('productState', productState);
    const productStateArr = Object.values(productState);

    return (
        <>
            <div>Selling</div>
            {productStateArr.map((product) => (
                <SellingTile key={product.id} product={product} />
            ))}
        </>
    )
}


export default SellingView;
