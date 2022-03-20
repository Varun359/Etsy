import React, { useEffect, useState } from "react";
import "./css/favoriteBanner.css";
import { Edit } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
// import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
function ProfileBanner() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [cookie, setCookie] = useCookies(["cookie"]);
  const [profileImg, setProfileImg] = useState(
    "http://localhost:3001/images/default_avatar.png"
  );
  const [shopName, setShopName] = useState("");
  const [shopImage, setShopImage] = useState(
    "http://localhost:3001/images/shop_default.png"
  );
  let user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    setName(user.first_name);
    axios
      .get("http://localhost:3001/shopDetails", {
        headers: {
          "content-Type": "application/json",
          "auth-token": cookie.cookie.token,
        },
      })
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);
          setShopName(response.data[0].shop_name);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    if (user.user_image != null)
      setProfileImg("http://localhost:3001/images/" + user.user_image);
    if (user.shop_image != null)
      setShopImage("http://localhost:3001/images/" + user.shop_image);
  }, []);

  return (
    <div className="favoriteBanner">
      <div className="favoriteBanner__main">
        <img className="favoriteBanner__main_img" src={profileImg} alt={name} />
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
      {shopName && (
        <div
          onClick={() => {
            navigate("/shop/" + user.user_id);
          }}
          className="favoriteBanner__shop"
        >
          <img
            className="favoriteBanner__shop_img"
            src={shopImage}
            alt={shopName}
          />
          <p className="favoriteBanner__shop_name">{shopName}</p>
        </div>
      )}
      {shopName === null && (
        <button
          className="btn btn-primary"
          onClick={(e) => {
            navigate("/createshop");
          }}
        >
          <b>+</b> Create Shop
        </button>
      )}
    </div>
  );
}

export default ProfileBanner;
