import React from "react";
import NavBar from "./NavBar";
import HoverBoard from "./HoverBoard";
import FavoriteBanner from "./FavoriteBanner";
import FavoriteList from "./FavoriteList";
function FavoritePage() {
  return (
    <>
      {" "}
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
        <FavoriteBanner name={"varun reddy"} shopName={"shop is great shop"} />
        <FavoriteList />
      </div>
    </>
  );
}

export default FavoritePage;
