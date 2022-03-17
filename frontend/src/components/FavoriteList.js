import React, { useEffect, useState } from "react";
import DashBoardItem from "./DashBoardItem";
import "./css/favoriteList.css";
import { Search } from "@material-ui/icons";
import axios from "axios";
import { useCookies } from "react-cookie";

function FavoriteList() {
  var [data, setData] = useState([]);
  var [dashBoardData, setDashBoardData] = useState([]);
  const [cookie, setCookie] = useCookies(["cookie"]);
  const [refresh, setRefresh] = useState(true);
  const removeItemId = (itemId) => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/favoriteItems", {
        headers: {
          "content-Type": "application/json",
          "auth-token": cookie.cookie.token,
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        console.log(data);
        var dashBoardData_dummy = [];
        if (response.data.length === 0) {
          dashBoardData_dummy = "nothing to show";
          setDashBoardData(dashBoardData_dummy);
        } else {
          dashBoardData_dummy = response.data.map((item) => {
            var ImageSrc =
              item.item_image === null
                ? require("../images/item_image.avif")
                : require(`../images/${item.item_image}`);
            var dashBoardItem = (
              <DashBoardItem
                key={item.item_id}
                src={ImageSrc}
                name={item.item_name}
                shopName={item.shop_name}
                price={item.item_price}
                currency={"$"}
                isFavorite={true}
                itemId={item.item_id}
                removeElement={removeItemId}
              />
            );
            if (item.item_name === null) {
              return null;
            }
            return dashBoardItem;
          });
          setDashBoardData(dashBoardData_dummy);
        }
      });
  }, [refresh]);
  return (
    <div className=" favoriteList__container">
      <div className="favoriteList__header">
        <h2 className="favoriteList__h2">Favorite items</h2>
        <div className="favoriteList_search">
          <input
            placeholder="search for favorites"
            className="favoriteList__input"
          />
          <Search className="favoriteList__search_icon" />
        </div>
      </div>
      <div className="dashBoardItem">{dashBoardData}</div>
    </div>
  );
}

export default FavoriteList;
