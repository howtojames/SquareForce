// import { NavLink, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react-redux';
import  './CheckoutPage.css';


function Checkout() {
    const dispatch = useDispatch();

    const [address, setAddress] = useState("");

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
                <input
                type="address"
                value={address}
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button id="edit-button">Edit</button>

            {/* previous addresses */}
            <div></div>
            <div></div>
            <div></div>

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
