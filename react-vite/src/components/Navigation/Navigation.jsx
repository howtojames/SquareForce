import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import "./Navigation.css";

function Navigation() {
  //grabs the sessionUser after first render
  const sessionUser = useSelector(state => state.session.user);
  //this runs on first render
  let loggedIn = false;  //not logged in by default
  if(sessionUser && Object.values(sessionUser).length > 0){
    loggedIn = true;
  } else {
    loggedIn = false;
  } //after this loggedIn is determined and put to use in the render


  return (
    <>
      <div id="upper-navigation">

        <div id="upper-left">
          <div><NavLink to="/">Home</NavLink></div>
          <div><ProfileButton /></div>
        </div>

        {loggedIn && (
          <div id="upper-right">
          <div><NavLink to="/products/new">Sell</NavLink></div>
          <div><NavLink to="/products/selling">Selling</NavLink></div>
          <div><NavLink>Shopping Cart</NavLink></div>
        </div>
        )}


      </div>

      <div id="mid-navigation">

      </div>

    </>
  );
}

export default Navigation;
