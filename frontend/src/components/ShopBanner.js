import React, { useEffect, useState } from "react";
import { Edit, CameraAlt } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import "./css/shopBanner.css";
import axios from "axios";
import { useCookies, CookiesProvider } from "react-cookie";
import { BASE_URL } from "../variables";
import { s3 } from "./configure";

function ShopBanner({ sales = 0, owner, user_id }) {
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

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    // setName(user.first_name);
    // setShopName(user.shop_name);
    axios
      .get(`${BASE_URL}/shopDetailsById/` + user_id, {
        headers: {
          "content-Type": "application/json",
          "auth-token": cookie.cookie.token,
        },
      })
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          // console.log(response.data, response.data[0].first_name);
          setName(response.data[0].first_name);
          setShopName(response.data[0].shop_name);
          console.log("response in shopbanner", response.data);
          if (response.data[0].shop_image != null)
            setShopImage(response.data[0].shop_image);
          if (response.data[0].user_image != null)
            setProfileImg(response.data[0].user_image);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // setProfileImg(user.user_image);
    // setShopImage(user.shop_image);
  }, []);

  const changeImage = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("ShopImage", data);

    //changed here
    const imageName = `shop/${Date.now()}_${data.name}`;
    console.log(imageName);
    const params = {
      Bucket: "etsyimages",
      Key: imageName,
      Expires: 60,
      ContentType: "image/*",
    };
    const uploadUrl = await s3.getSignedUrlPromise("putObject", params);
    console.log(uploadUrl);
    await fetch(
      new Request(uploadUrl, {
        method: "PUT",
        body: data,
        headers: new Headers({
          "Content-Type": "image/*",
        }),
      })
    );

    const imageUrl = uploadUrl.split("?")[0];

    const imageData = {
      imageUrl,
    };
    axios
      .post(`${BASE_URL}/updateShopImage`, imageData, {
        headers: {
          "content-Type": "application/json",
          "auth-token": cookie.cookie.token,
        },
      })
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response);
          // setUpdated(true);
          console.log(response.data.shop_image);
          setShopImage(response.data.shop_image);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    //chnaged till here

    // axios
    //   .post(`${BASE_URL}/updateShopImage`, formData, {
    //     headers: {
    //       "content-Type": "multipart/form-data",
    //       "auth-token": cookie.cookie.token,
    //     },
    //   })
    //   .then((response) => {
    //     console.log("Status Code : ", response.status);
    //     if (response.status === 200) {
    //       console.log(response);
    //       // setUpdated(true);
    //       console.log(`${BASE_URL}/images/${response.data.shop_image}`);
    //       setShopImage(`${BASE_URL}/images/${response.data.shop_image}`);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  return (
    <div className="shopBanner">
      <div className="shopBanner__shop">
        <img className="shopBanner__shop_img" src={shopImage} alt={shopName} />
        {/* <CameraAlt className="shopBanner__shop_icon" /> */}
        <label class="shopBanner__shop_icon">
          <input
            onChange={(event) => {
              console.log(event.target.files);
              changeImage(event.target.files[0]);
            }}
            type="file"
          />

          <CameraAlt />
          {/* Custom Upload */}
        </label>
        {/* <input
          className="shopBanner__shop_icon"
          onChange={(event) => {
            console.log(event.target.files);
            changeImage(event.target.files[0]);
          }}
          type="file"
        /> */}

        {/* <CameraAlt className="shopBanner__shop_icon" /> */}
      </div>
      <div className="shopBanner__text">
        <h1 className="shopBanner__text_name">{shopName}</h1>
        <div style={{ display: "flex", alignItems: "space-between" }}>
          {owner && (
            <>
              <Edit
                className="shopBanner__text_icon"
                style={{ fontSize: "1.25rem" }}
                onClick={() => {
                  console.log("edit shop");
                }}
              />
              <p className="shopBanner_text_sales"> {sales} sales</p>
            </>
          )}
        </div>
      </div>
      <div
        onClick={() => {
          if (owner) {
            navigate("/favorite");
          }
        }}
        className="shopBanner__main"
      >
        <img className="shopBanner__main_img" src={profileImg} alt={name} />
        <p className="shopBanner__main_text">{name} </p>
      </div>
    </div>
  );
}

export default ShopBanner;
