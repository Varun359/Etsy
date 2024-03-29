import React, { useEffect, useState } from "react";
import axios from "axios";
import DashBoardItem from "./DashBoardItem";
import "./css/dashBoard.css";
import { useCookies } from "react-cookie";
import DashboardContext from "./Dashboard-context";
import ItemOverviewPage from "./ItemOverviewPage";
import { BASE_URL, KAFKA_BASE_URL } from "../variables";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems } from "../features/itemsSlice";
//import { env } from "process";
function DashBoard({ loggedIn }) {
  const dispatch = useDispatch();
  var data = [];
  var [dashBoardData, setDashBoardData] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cookie, setCookie] = useState(undefined);
  const [dashboardRefresh, setDashboardRefresh] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [itemsRefresh, setItemsRefresh] = useState(false);
  const values = {
    dashboardRefresh,
    setDashboardRefresh,
    cartCount,
    setCartCount,
  };

  const handleRefresh = () => {
    console.log("In handlerefresh");
    setItemsRefresh(!itemsRefresh);
  };
  //console.log(cookie);
  useEffect(() => {
    //console.log(cookie);
    var cookies = decodeURIComponent(document.cookie).split(";");
    cookies.forEach((cookieEle) => {
      //console.log(cookieEle);
      //console.log(cookieEle.indexOf("cookie=j:"));
      if (cookieEle.indexOf("cookie=j:") !== -1) {
        if (cookieEle.replace("cookie=j:", "") !== cookie) {
          setRefresh(true);
          setCookie(JSON.parse(cookieEle.replace("cookie=j:", "")));
        }
        //console.log(cookie);
      }
    });
    // console.log(cookie);
    if (cookie === undefined) {
      axios
        .get(`${BASE_URL}/allItems`, {
          headers: {
            "content-Type": "application/json",
          },
        })
        .then((response) => {
          data = response.data;
          dispatch(getAllItems(response.data));
          // console.log("This is the response ", response);
          var dashBoardData_dummy = data.map((item) => {
            console.log(item);
            var ImageSrc =
              item.item_image === null
                ? `${BASE_URL}/images/item_image.avif`
                : `${item.item_image}`;
            var dashBoardItem = (
              <DashBoardItem
                key={item.item_id}
                src={ImageSrc}
                name={item.item_name}
                shopName={item.shoop_name}
                price={item.item_price}
                currency={"$"}
                itemId={item.item_id}
                isFavorite={item.is_favorite}
                handleRefresh={handleRefresh}
              />
            );
            if (item.item_name === null) {
              return null;
            }
            return dashBoardItem;
          });
          setDashBoardData(dashBoardData_dummy);
        });
    } else {
      //console.log("cookie", cookie.token);
      axios
        .get(`${BASE_URL}/allItemsById`, {
          headers: {
            "content-Type": "application/json",
            "auth-token": cookie.token,
          },
        })
        .then((response) => {
          dispatch(getAllItems(response.data));
          data = response.data;
          // console.log(response);
          var dashBoardData_dummy = data.map((item) => {
            var ImageSrc =
              item.item_image === null
                ? `${BASE_URL}/images/item_image.avif`
                : `${item.item_image}`;
            // console.log(ImageSrc);
            //console.log(item);
            console.log("HELLO", item);

            var dashBoardItem = (
              <DashBoardItem
                key={item.item_id}
                src={ImageSrc}
                name={item.item_name}
                shopName={item.shoop_name}
                price={item.item_price}
                currency={"$"}
                itemId={item.item_id}
                isFavorite={item.is_Favorite}
                handleRefresh={handleRefresh}
              />
            );
            if (item.item_name === null) {
              return null;
            }
            return dashBoardItem;
          });
          setDashBoardData(dashBoardData_dummy);
        });
    }
  }, [loggedIn, refresh, itemsRefresh]);

  return (
    <DashboardContext.Provider value={values}>
      {/* <ItemOverviewPage /> */}
      <div className="dashBoardItem">{dashBoardData}</div>
    </DashboardContext.Provider>
  );
}

export default DashBoard;
