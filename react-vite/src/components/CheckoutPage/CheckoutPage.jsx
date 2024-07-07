// import { NavLink, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react-redux';
import  './CheckoutPage.css';


function Checkout() {
    const dispatch = useDispatch();

    useEffect(() => {
        //think of thunk here
    }, [dispatch])


    return (
        <div id="checkout-container">

            <div>Current Shipping Address</div>
            {/* want to update address here */}
            {/* display the user's address here */}

            <div>
                <input></input>
            </div>
            <button>Edit</button>


            {/* checkout with something here */}
            {/* use external tools for checkout */}
        </div>
    )

}

export default Checkout;
