import React, { useState, useEffect } from "react";
import HoverBoard from "./HoverBoard";
import NavBar from "./NavBar";
import CartItems from "./CartItems";
import "./css/home.css";
function CartDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <>
      <div className="container">
        <NavBar
          callBack={() => {
            setIsLoggedIn(!isLoggedIn);
          }}
        />
        <HoverBoard />
      </div>
      <hr
        style={{
          border: "1px solid rgba(34, 34, 34, 0.15)",
        }}
      ></hr>
      <div className="container">
        <CartItems />
      </div>
    </>
  );
}

export default CartDashboard;
