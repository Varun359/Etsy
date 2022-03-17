import React, { useState } from "react";
import NavBar from "./NavBar";
import HoverBoard from "./HoverBoard";
import ShopBanner from "./ShopBanner";
import ShopList from "./ShopList";
import "./css/shopList.css";
import ShopAddItem from "./ShopAddItem";
function Shop() {
  const [showSignIn, setshowSignIn] = useState(false);

  return (
    <>
      <div className="container ">
        <NavBar />
        <HoverBoard />
      </div>
      <hr
        style={{
          border: "1px solid rgba(34, 34, 34, 0.15)",
        }}
      ></hr>
      <div className="container">
        <ShopBanner name={"Varun Reddy"} shopName={"shop is great shop"} />
      </div>
      <div style={{ marginTop: "1em" }} className="container">
        <button
          onClick={() => {
            console.log("hello");
            setshowSignIn(true);
          }}
          className="shopList__add_items"
        >
          {" "}
          Add Items{" "}
        </button>
      </div>
      <div style={{ marginTop: "1em", display: "flex" }} className="container">
        <ShopList></ShopList>
      </div>
      <ShopAddItem
        isOpen={showSignIn}
        closeModal={(e) => {
          setshowSignIn(false);
        }}
      />
      {
        // <ShopAddItem
        //   isOpen={showSignIn}
        //   closeModal={(e) => {
        //     setshowSignIn(false);
        //   }}
        // ></ShopAddItem>
      }
    </>
  );
}

export default Shop;
