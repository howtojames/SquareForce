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

      {/* wigth 95% applied */}
      <div id="top-navigation">
        <div id="profile-button"><ProfileButton /></div>

        {loggedIn && (
          <div id="top-right">
            <div><NavLink to="/products/new" className="top-right-tabs">Sell</NavLink></div>
            <div><NavLink to="/watchlist" className="top-right-tabs">Watchlist</NavLink></div>
            <div><NavLink to="/products/selling" className="top-right-tabs">Selling</NavLink></div>
            <div><NavLink to="/shopping-cart" className="top-right-tabs">
              <i class="fa-solid fa-cart-shopping"></i>
            </NavLink></div>
          </div>
        )}
      </div>

      <div id="top-border"></div>

      <div id="mid-navigation">

          <div id="logo-container">
            <NavLink to="/" id="square-force">
              <span id='logo-red'>S</span>
              <span id='logo-blue'>q</span>
              <span id='logo-yellow'>u</span>
              <span id='logo-green'>a</span>
              <span id='logo-blue'>r</span>
              <span id='logo-yellow'>e</span>
              <span id='logo-red'>f</span>
              <span id='logo-green'>o</span>
              <span id='logo-yellow'>r</span>
              <span id='logo-blue'>c</span>
              <span id='logo-green'>e</span>
            </NavLink>
          </div>
      </div>
      <div id="bottom-border"></div>

    </div>



  );
}

export default Navigation;
