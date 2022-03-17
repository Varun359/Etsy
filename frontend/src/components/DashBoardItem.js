import React, { useContext, useEffect, useState } from "react";
import "./css/dashBoardItem.css";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import axios from "axios";
import { useCookies } from "react-cookie";
import DashboardContext from "./Dashboard-context";
let sample = false;
function DashBoardItem({
  itemId,
  src,
  name,
  shopName,
  currency,
  price,
  isFavorite,
  removeElement,
  handleRefresh,
}) {
  const { dashBoardData, setDashBoardData } = useContext(DashboardContext);
  sample = isFavorite;
  const [favorite, setFavorite] = useState(true);
  const handleFavorite = (e) => {};
  const [cookie, setCookie] = useCookies(["cookie"]);
  // var cookie = undefined;
  // setFavorite(isFavorite);
  useEffect(() => {
    console.log("sample use effect");
  }, [sample]);
  // setFavorite(isFavorite);
  // console.log(favorite);
  console.log("favorite", favorite, isFavorite, isFavorite);
  const addFavorite = (e) => {
    console.log("inside");
    if (isFavorite !== true) {
      var cookies = decodeURIComponent(document.cookie).split(";");
      cookies.forEach((cookieEle) => {
        if (cookieEle.indexOf("cookie=j:") !== -1) {
          if (cookieEle.replace("cookie=j:", "") !== cookie) {
            // cookie = JSON.parse(cookieEle.replace("cookie=j:", ""));
          }
          console.log(cookie);
        }
      });
      axios
        .post(
          "http://localhost:3001/addFavorites/" + itemId,
          {},
          {
            headers: {
              "content-Type": "application/json",
              "auth-token": cookie.cookie.token,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            isFavorite = true;
            console.log("sampleadd", isFavorite);
            handleRefresh();
            // setDashBoardData(!dashBoardData);
            // setFavorite(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(
          "http://localhost:3001/removeFavorites/" + itemId,
          {},
          {
            headers: {
              "content-Type": "application/json",
              "auth-token": cookie.cookie.token,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            if (removeElement !== undefined) {
              removeElement(itemId);
            }
            isFavorite = false;
            console.log("sampleremove", isFavorite);
            handleRefresh();
            // setDashBoardData(!dashBoardData);
            // setFavorite(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="card">
      <div className="card-header">
        <img src={src} alt={name} />
        <div
          onClick={(e) => {
            addFavorite(e);
          }}
        >
          {!isFavorite && <FavoriteBorder className="dashBoardItem__icon" />}
          {isFavorite && <Favorite className="dashBoardItem__icon__filled" />}
        </div>
      </div>

      <div className="card-content">
        <h3 className="product__name">{name}</h3>
        <small>{shopName}</small>
        <h3>{`${currency} ${price}`}</h3>
      </div>
    </div>
  );
}

export default DashBoardItem;
