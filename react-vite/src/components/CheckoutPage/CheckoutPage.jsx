// import { NavLink, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react-redux';
import  './CheckoutPage.css';


function Checkout() {
    const dispatch = useDispatch();

    useEffect(() => {
        //think of thunk here
    }, [dispatch])

    //think of where you the address will come from
    //check the frontend



    return (
        <div id="checkout-container">

            <div>Current Shipping Address</div>
            {/* want to update address here */}
            {/* display the user's address here */}

            <div>
                <input></input>
            </div>
            <button>Edit</button>

            {/* previosu addresses */}
            <div></div>
            <div></div>
            <div></div>

            <div></div>
            <div></div>


            {/* checkout with something here */}
            {/* use external tools for checkout */}
        </div>
    )

}

export default Checkout;
