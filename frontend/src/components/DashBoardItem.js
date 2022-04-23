import React, { useContext, useEffect, useState } from "react";
import "./css/dashBoardItem.css";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import axios from "axios";
import { useCookies } from "react-cookie";
import DashboardContext from "./Dashboard-context";
import { Link } from "react-router-dom";
import { BASE_URL } from "../variables";
import { useDispatch, useSelector } from "react-redux";
import { addFavorites } from "../features/itemsSlice";
import { removeFavorites } from "../features/itemsSlice";

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
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("sample use effect");
  }, [sample]);
  // setFavorite(isFavorite);
  // console.log(favorite);
  console.log("favorite", favorite, isFavorite);
  const addFavorite = (e) => {
    console.log("inside");
    if (isFavorite !== true) {
      var cookies = decodeURIComponent(document.cookie).split(";");
      cookies.forEach((cookieEle) => {
        if (cookieEle.indexOf("cookie=j:") !== -1) {
          if (cookieEle.replace("cookie=j:", "") !== cookie) {
            // cookie = JSON.parse(cookieEle.replace("cookie=j:", ""));
          }
          // console.log(cookie);
        }
      });
      axios
        .post(
          `${BASE_URL}/addFavorites/` + itemId,
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
            console.log("Response is ", response.data);
            isFavorite = true;
            // dispatch(addFavorites(response.data));
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
          `${BASE_URL}/removeFavorites/` + itemId,
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
            // dispatch(
            //   removeFavorites({
            //     item_id: itemId,
            //   })
            // );
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
    <Link to={`/item/${itemId}`} class="card">
      <img class="card-img-top" src={src} alt="Card cap" />
      <div
        onClick={(e) => {
          addFavorite(e);
          e.preventDefault();
        }}
      >
        {!isFavorite && <FavoriteBorder className="dashBoardItem__icon" />}
        {isFavorite && <Favorite className="dashBoardItem__icon__filled" />}
      </div>
      <div class="card-body">
        <h5 class="card-title">{name}</h5>
        <p class="card-text">{shopName}</p>
        <h4 class="card-text font-weight-bold">{`${currency} ${price}`}</h4>
      </div>
    </Link>
  );
}

export default DashBoardItem;
