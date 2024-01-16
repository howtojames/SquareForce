import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import "./Navigation.css";

function Navigation() {
  //grabs the sessionUser after first render
  const sessionUser = useSelector(state => state.session.user);

  let loggedIn = false;
  if(sessionUser && Object.values(sessionUser).length > 0){
    loggedIn = true;
  } else {
    loggedIn = false;
  }


  return (
    <div id='navigation-container'>

      <div id="top-navigation">
        <div id="profile-button"><ProfileButton /></div>

        {loggedIn && (
          <div id="top-right">
            <div><NavLink to="/products/new" className="top-right-tabs">Sell</NavLink></div>
            <div><NavLink to="/products/selling" className="top-right-tabs">Selling</NavLink></div>
            <div><NavLink to="/shopping-cart" className="top-right-tabs">Shopping Cart</NavLink></div>
          </div>
        )}
      </div>

      <div id="top-border"></div>

      <div id="mid-navigation">

          <div id="logo-container">
            <NavLink to="/" id="square-force">
              SquareForce
            </NavLink>
          </div>
      </div>
      <div id="bottom-border"></div>

    </div>



  );
}

export default Navigation;
