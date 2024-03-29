import React, { useContext, useEffect, useState } from "react";
import SignIn from "./SignIn";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import "./css/navBar.css";
import { useCookies, CookiesProvider, Cookies } from "react-cookie";
import HomeContext from "./Home-Context";
// import DashboardContext from "./Dashboard-context";
import Badge from "@material-ui/core/Badge";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userSlice";
import { getCartItems, clearCart } from "../features/cartItemSlice";
import { BASE_URL, KAFKA_BASE_URL } from "../variables";
import { removeFavoritesList } from "../features/itemsSlice";
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
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const [navLogin, setNavLogin] = useState("");

  const [triggerRefresh, setTriggerRefresh] = useState(false);

  // const { cartCount, setCartCount } = useContext(DashboardContext);
  // const [showSignIn, setshowSignIn] = useState(true);

  //const [showProfileLists, setShowProfileLists] = useState(false);
  // console.log(cartCount);

  const dispatch = useDispatch();
  const cartItems = useSelector(getCartItems);

  const handleTriggerRefresh = () => {
    setTriggerRefresh(!triggerRefresh);
  };
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
  const logoutHandler = async () => {
    // axios
    //   .get(`${BASE_URL}/deleteCartItems`, {
    //     headers: {
    //       "content-Type": "application/json",
    //       "auth-token": cookie.cookie.token,
    //     },
    //   })
    //   .then((response) => {
    //     console.log("Status Code : ", response.status);
    //     if (response.status === 200) {
    //       console.log("Items deleted from the cart");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    console.log("Cookieeeeee", cookie.cookie.token);
    console.log("Cart Items", cartItems);
    console.log("This is printing second");

    if (cartItems.length !== 0) {
      await axios
        .post(`${BASE_URL}/addAllCartItems`, cartItems, {
          headers: {
            "content-Type": "application/json",
            "auth-token": cookie.cookie.token,
          },
        })
        .then((response) => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            console.log("added all items from the cart from Redux");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log("This is printing first");
    removeCookie("cookie");
    dispatch(logout());
    dispatch(removeFavoritesList());
    dispatch(clearCart());
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    handleTriggerRefresh();
    navigate("/");
  };

  const handleOnClickCart = () => {
    console.log("inside onclick");
    navigate("/cartitems");
  };

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    let name = "";
    if (user) {
      console.log(user);
      name = user.first_name;
    }
    if (isloggedIn || user) {
      setNavLogin(
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
                {name}
              </p>
              <p
                onClick={() => {
                  navigate("/purchases");
                }}
              >
                Purchases
              </p>
              <p
                onClick={() => {
                  logoutHandler();
                }}
              >
                sign out
              </p>
            </div>
          </div>
          {/* <Badge badgeContent={parseInt(count)} color="primary"> */}
          <li
            onClick={(e) => {
              handleOnClickCart(e);
            }}
            className="signin__icon"
          >
            <ShoppingCart />
          </li>
          {/* </Badge> */}
        </ul>
      );
    } else {
      setNavLogin(
        <ul className="icons my-2">
          <li className="signin__login" onClick={popUpSignIn}>
            Login
          </li>
          <li className="signin__icon">
            <ShoppingCart />
          </li>
        </ul>
      );
    }
  }, [triggerRefresh]);

  return (
    <div className="navBar__div my-2">
      <header className="navBar">
        <h2
          onClick={() => {
            navigate("/");
          }}
          className="navbar__logo"
        >
          Etsy
        </h2>
        <form
          className="search d-flex align-items-center"
          onSubmit={(e) => {
            navigate(`/search/${search}`);
          }}
        >
          <input
            type="text"
            id="searchBar"
            className="searchBar"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          ></input>
          <button type="submit" className="border-0">
            <Search className="ml-4" />
          </button>
        </form>
        {navLogin}
      </header>
      {showSignIn && (
        <SignIn
          handleTriggerRefresh={handleTriggerRefresh}
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
          }}
          openRegister={(e) => {
            setshowSignIn(false);
          }}
        ></SignIn>
      )}
    </div>
  );
}

export default NavBar;
