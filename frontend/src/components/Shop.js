import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import HoverBoard from "./HoverBoard";
import ShopBanner from "./ShopBanner";
import ShopList from "./ShopList";
import "./css/shopList.css";
import ShopAddItem from "./ShopAddItem";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
function Shop() {
  const navigate = useNavigate;
  const [showSignIn, setshowSignIn] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { user_id } = useParams();
  let user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(
      "user.user_id === user_id",
      user.user_id === user_id,
      user.user_id,
      user_id
    );
    if (parseInt(user.user_id) === parseInt(user_id)) {
      setIsOwner(true);
      console.log("he is owner");
    }
    console.log("he is not owner");
  });
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
        <ShopBanner user_id={user_id} owner={isOwner} />
      </div>
      {isOwner && (
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
      )}
      <div style={{ marginTop: "1em", display: "flex" }} className="container">
        <ShopList user_id={user_id} owner={isOwner}></ShopList>
      </div>
      {isOwner && (
        <ShopAddItem
          isOpen={showSignIn}
          closeModal={(e) => {
            setshowSignIn(false);
            //  navigate("/shop/" + user.user_id);
          }}
        />
      )}
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
