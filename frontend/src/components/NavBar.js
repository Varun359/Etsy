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

    const [triggerRefresh, setTriggerRefresh] = useState(false);

    // const { cartCount, setCartCount } = useContext(DashboardContext);
    // const [showSignIn, setshowSignIn] = useState(true);

    //const [showProfileLists, setShowProfileLists] = useState(false);
    // console.log(cartCount);
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
    const logoutHandler = () => {
        removeCookie("cookie");
        // dispatch(logout());
        localStorage.removeItem("user");
        localStorage.removeItem("shop");
        setIsLoggedIn(false);
        navigate("/");
    };

    const [name, setName] = useState("");

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user") || null);
        if (user) {
            setName(user.first_name);
            //   if (isloggedIn || user !== undefined) {
            //     axios
            //       .get("http://localhost:3001/CartItems", {
            //         headers: {
            //           "content-Type": "application/json",
            //           "auth-token": cookie.cookie.token,
            //         },
            //       })
            //       .then((response) => {
            //         console.log("Status Code : ", response.status);
            //         if (response.status === 200) {
            //           console.log(response.data);
            //           setCount(response.data.length);
            //           navigate("/");
            //           console.log("count", count);
            //         }
            //       })
            //       .catch((err) => {
            //         console.log(err);
            //       });
            //   }
        }
        // setProfileImg(user.user_image);
        // setShopImage(user.shop_image);
    }, [triggerRefresh]);

    const handleOnClickCart = () => {
        console.log("inside onclick");
        navigate("/cartitems");
    };
    var user = cookie.cookie;
    console.log("usercookie", user);
    let navLogin = null;

    if (isloggedIn || user !== undefined) {
        navLogin = (
            <ul className="icons">
                <li className="signin__icon" onClick={handleFavoriteClick}>
                    <FavoriteBorderSharp />
                </li>

                <div className="dropdown">
                    <li
                        onClick={showProfileList}
                        className="signin__icon dropbtn  "
                    >
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
        navLogin = (
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
