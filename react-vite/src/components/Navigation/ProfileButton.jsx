import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const navigate = useNavigate();

  //to get current user
  const sessionUser = useSelector(state => state.session.user);
  let loggedIn = false;
  if(sessionUser && Object.values(sessionUser).length > 0){
    loggedIn = true;
  } else {
    loggedIn = false;
  } //after this loggedIn is determined and put to use in the render

  //onClick function for logout
  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    //logging out on any page should return us to the homepage
    navigate('/');
  };

  //code for toggle Menu
  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);
  //end

  //console.log("sessionUser", sessionUser)

  return (
    <>
      {/* this works fine, good job james! */}
      <span className="hi-sign-in">Hi&nbsp;
      <button onClick={toggleMenu} id="dropdown-button">
        {loggedIn ? (
          <>
            <span className="hi-sign-in">{sessionUser.username}!</span>
            <i className="fa-solid fa-angle-down"></i>
          </>
        ) : (
          <span className="hi-sign-in">(<span id="sign-in">Sign In</span>)</span>
        )}
      </button>

      </span>
        {/* <i className="fas fa-user-circle" /> */}

      {showMenu && (
        <div id={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <div>{user.username}</div>
              <div>{user.email}</div>
              <div>
                <button onClick={logout} id="logout-button">Log Out</button>
              </div>
            </>
          ) : (
            <>
              <div id="login-modal-button">
                <OpenModalMenuItem
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </div>
              <div id="signup-modal-button">
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default ProfileButton;
