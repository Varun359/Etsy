import React, { useEffect, useState } from "react";
import "./css/favoriteBanner.css";
import { Edit } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
// import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { BASE_URL, KAFKA_BASE_URL } from "../variables";
function ProfileBanner() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [cookie, setCookie] = useCookies(["cookie"]);
  const [profileImg, setProfileImg] = useState(
    `${BASE_URL}/images/default_avatar.png`
  );
  const [shopName, setShopName] = useState("");
  const [shopImage, setShopImage] = useState(
    `${BASE_URL}/images/shop_default.png`
  );
  let user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  useEffect(() => {
    //let user = JSON.parse(localStorage.getItem("user"));
    setName(user.first_name);
    axios
      .get(`${KAFKA_BASE_URL}/shopDetails`, {
        headers: {
          "content-Type": "application/json",
          "auth-token": cookie.cookie.token,
        },
      })
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log("in favorite Banner", response.data);
          response.data = response.data.results;
          //   user["user_image"] = response.data.user_image;
          //   console.log("user ", user);
          if (response.data.user_image != null) {
            setProfileImg(response.data.user_image);
            console.log(
              "In fav banner profile image is ",
              response.data.user_image
            );
          }
          if (response.data.shop_image != null) {
            setShopImage(response.data.shop_image);
            console.log(
              "In fav banner shop image is ",
              response.data.shop_image
            );
          }
          setShopName(response.data.shop_name);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
