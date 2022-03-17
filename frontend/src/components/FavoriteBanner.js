import React from "react";
import "./css/favoriteBanner.css";
import { Edit } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
function ProfileBanner({
  name,
  profileSrc = require("../images/default_avatar.png"),
  shopName,
  shopImageSrc = require("../images/shop_default.png"),
}) {
  const navigate = useNavigate();
  return (
    <div className="favoriteBanner">
      <div className="favoriteBanner__main">
        <img className="favoriteBanner__main_img" src={profileSrc} alt={name} />
      </div>
      <div className="favoriteBanner__text">
        <h1 className="favoriteBanner__text_name">{name}</h1>
        <Edit
          className="favoriteBanner__text_icon"
          style={{ fontSize: "1.25rem" }}
          onClick={() => {
            navigate("/profile");
          }}
        />
      </div>
      <div
        onClick={() => {
          navigate("/shop");
        }}
        className="favoriteBanner__shop"
      >
        <img
          className="favoriteBanner__shop_img"
          src={shopImageSrc}
          alt={shopName}
        />
        <p className="favoriteBanner__shop_name">{shopName}</p>
      </div>
    </div>
  );
}

export default ProfileBanner;
