// import { NavLink, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react-redux';
import  './CheckoutPage.css';


function Checkout() {
    const dispatch = useDispatch();

    const [address, setAddress] = useState("");
    // const [password, setPassword] = useState("");

    useEffect(() => {
        //think of thunk here
    }, [dispatch])


    return (
        <div id="checkout-container">

            <div>Current Shipping Address</div>
            {/* want to update address here */}
            {/* display the user's address here */}

            <div>
                <input
                type="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}/>
            </div>
            <button id="edit-button">Edit</button>

            {/* previous addresses */}
            <div>
                <div>Select Address:</div>

                {}
                <div>
                    <button>Edit</button>
                </div>

                <div></div>
                <div></div>
                <div></div>
            </div>


            {/* checkout with something here */}
            {/* use external tools for checkout */}
            <div>
                <div><button>Checkout</button></div>
                <div>Payment</div>

            </div>



        </div>
    )

}

export default Checkout;
