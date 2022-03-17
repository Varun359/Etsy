import React, { useState } from "react";
import SignIn from "./SignIn";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import "./css/navBar.css";
import { useCookies, CookiesProvider, Cookies } from "react-cookie";

import {
  ShoppingCart,
  Person,
  NotificationsNoneSharp,
  FavoriteBorderSharp,
  Search,
} from "@material-ui/icons";
function NavBar({ callBack }) {
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [showSignIn, setshowSignIn] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(["cookie"]);
  const [showProfileLists, setShowProfileLists] = useState(false);
  // const [showSignIn, setshowSignIn] = useState(true);

  //const [showProfileLists, setShowProfileLists] = useState(false);
  const navigate = useNavigate();
  const popUpSignIn = () => {
    setshowSignIn(true);
  };

  const showProfileList = () => {
    setShowProfileLists(true);
  };
  const handleFavoriteClick = () => {
    navigate("/favorite");
  };
  const logoutHandler = () => {
    removeCookie("cookie");
    // dispatch(logout());
    setIsLoggedIn(false);
  };
  var user = cookie.cookie;
  let navLogin = null;
  if (isloggedIn || user !== undefined) {
    navLogin = (
      <ul className="icons">
        <li className="signin__icon" onClick={handleFavoriteClick}>
          <FavoriteBorderSharp />
        </li>

        <div className="dropdown">
          <li onClick={showProfileList} className="signin__icon dropbtn  ">
            <Person />
          </li>
          <div class="dropdown-content">
            <p
              onClick={() => {
                navigate("/favorite");
              }}
            >
              {"varun reddy"}
            </p>
            <p>purchases and reviews</p>
            <p
              onClick={() => {
                logoutHandler();
              }}
            >
              sign out
            </p>
          </div>
        </div>
        <li className="signin__icon">
          <ShoppingCart />
        </li>
      </ul>
    );
  } else {
    navLogin = (
      <ul className="icons">
        <li className="signin__login" onClick={popUpSignIn}>
          Login
        </li>
        <li className="signin__icon">
          <ShoppingCart />
        </li>
      </ul>
    );
  }
  return (
    <div className="navBar__div">
      <header className="navBar">
        <h2
          onClick={() => {
            navigate("/");
          }}
          className="navbar__logo"
        >
          Etsy
        </h2>
        <div className="search">
          <input type="text" id="searchBar" className="searchBar"></input>
          <Search className="searchBar__icon " />
        </div>
        {navLogin}
      </header>
      {showSignIn && (
        <SignIn
          isOpen={showSignIn}
          closeModal={(e, status) => {
            setshowSignIn(false);
            setIsLoggedIn(status);
            if (status === true) {
              console.log("in callBack");
              if (callBack) {
                callBack();
              }
            }
            // navigate("/home");
          }}
          openRegister={(e) => {
            setshowSignIn(false);
          }}
        ></SignIn>
      )}

      {/* {showProfileLists && ( */}
      {/* // <ProfileList setShowProfileLists={setShowProfileLists} /> */}
      {/* // )} */}
    </div>
  );
}

export default NavBar;
