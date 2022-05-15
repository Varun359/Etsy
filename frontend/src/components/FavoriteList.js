import React, { useEffect, useState } from "react";
import DashBoardItem from "./DashBoardItem";
import "./css/favoriteList.css";
import { Search } from "@material-ui/icons";
import axios from "axios";
import { useCookies } from "react-cookie";
import { BASE_URL, KAFKA_BASE_URL } from "../variables";

import { useDispatch, useSelector } from "react-redux";
import { favoritesList } from "../features/itemsSlice";

function FavoriteList() {
  const dispatch = useDispatch();
  //const user = useSelector(selectUser);

  var [data, setData] = useState([]);
  var [dashBoardData, setDashBoardData] = useState([]);
  const [cookie, setCookie] = useCookies(["cookie"]);
  const [refresh, setRefresh] = useState(true);
  const [search, setSearch] = useState("");
  const removeItemId = (itemId) => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/favoriteItems`, {
        headers: {
          "content-Type": "application/json",
          "auth-token": cookie.cookie.token,
        },
      })
      .then((response) => {
        console.log(response.data);
        response.data = response.data;
        console.log(response.data);
        setData(response.data);
        console.log(data);
        var dashBoardData_dummy = [];
        if (response.data.length === 0) {
          dashBoardData_dummy = "nothing to show";
          setDashBoardData(dashBoardData_dummy);
        } else {
          dashBoardData_dummy = response.data.map((item) => {
            dispatch(favoritesList(response.data));
            var ImageSrc =
              item.item_image === null
                ? `${BASE_URL}/images/item_image.avif`
                : `${item.item_image}`;
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
                handleRefresh={removeItemId}
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

  const searchResults = () => {
    axios
      .get(`${BASE_URL}/searchFavoriteItems/${search}`, {
        headers: {
          "content-Type": "application/json",
          "auth-token": cookie.cookie.token,
        },
      })
      .then((response) => {
        console.log(response.data);
        response.data = response.data;
        setData(response.data);
        console.log(response.data);
        var dashBoardData_dummy = [];
        if (response.data === 0) {
          dashBoardData_dummy = "nothing to show";
          setDashBoardData(dashBoardData_dummy);
        } else {
          dashBoardData_dummy = response.data.map((item) => {
            console.log("ITEMMM IS ", item);
            var ImageSrc =
              item.item_image === null
                ? `${BASE_URL}/images/item_image.avif`
                : `${item.item_image}`;
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
  };
  return (
    <div className=" favoriteList__container">
      <div className="favoriteList__header">
        <h2 className="favoriteList__h2">Favorite items</h2>
        <form
          className="favoriteList_search"
          onSubmit={(e) => {
            e.preventDefault();
            searchResults();
          }}
        >
          <input
            placeholder="search for favorites"
            className="favoriteList__input"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button type="submit" className="border-0 favoriteList__search_icon">
            <Search />
          </button>
        </form>
      </div>
      <div className="dashBoardItem">{dashBoardData}</div>
    </div>
  );
}

export default FavoriteList;
