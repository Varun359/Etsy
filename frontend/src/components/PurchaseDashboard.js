import React, { useState, useEffect } from "react";
import HoverBoard from "./HoverBoard";
import NavBar from "./NavBar";
import CartItems from "./CartItems";
import "./css/home.css";
import PurchaseItems from "./PurchaseItems";
import { useLocation } from "react-router-dom";
function PurchaseDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const location = useLocation();
  console.log("itemsdatainpurchases", location.state);
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
        <PurchaseItems />
      </div>
    </>
  );
}

export default PurchaseDashboard;
