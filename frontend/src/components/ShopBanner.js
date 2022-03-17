import React from "react";
import { Edit, CameraAlt } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import "./css/shopBanner.css";

function ShopBanner({
  name,
  profileSrc = require("../images/default_avatar.png"),
  shopName,
  shopImageSrc = require("../images/shop_default.png"),
  sales = 0,
}) {
  const navigate = useNavigate();

  return (
    <div className="shopBanner">
      <div className="shopBanner__shop">
        <img
          className="shopBanner__shop_img"
          src={shopImageSrc}
          alt={shopName}
        />
        <CameraAlt className="shopBanner__shop_icon" />
      </div>
      <div className="shopBanner__text">
        <h1 className="shopBanner__text_name">{shopName}</h1>
        <div style={{ display: "flex", alignItems: "space-between" }}>
          <Edit
            className="shopBanner__text_icon"
            style={{ fontSize: "1.25rem" }}
            onClick={() => {
              console.log("edit shop");
            }}
          />
          <p className="shopBanner_text_sales"> {sales} sales</p>
        </div>
      </div>
      <div
        onClick={() => {
          navigate("/favorite");
        }}
        className="shopBanner__main"
      >
        <img className="shopBanner__main_img" src={profileSrc} alt={name} />
        <p className="shopBanner__main_text">{name} </p>
      </div>
    </div>
  );
}

export default ShopBanner;
