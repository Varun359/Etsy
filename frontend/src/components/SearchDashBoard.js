import React, { useEffect, useState } from "react";
import axios from "axios";
import DashBoardItem from "./DashBoardItem";
import "./css/SearchDashBoard.css";
import { useCookies } from "react-cookie";
import { useParams } from "react-router";
import NavBar from "./NavBar";
import HoverBoard from "./HoverBoard";
function SearchDashBoard() {
  var [dashBoardData, setDashBoardData] = useState([]);
  const [cookie, setCookie] = useCookies(["cookie"]);
  const [itemsRefresh, setItemsRefresh] = useState(false);
  const { search } = useParams();

  const handleRefresh = () => {
    setItemsRefresh(!itemsRefresh);
  };
  console.log(cookie);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/searchItems/${search}`, {
        headers: {
          "content-Type": "application/json",
          "auth-token": cookie.cookie.token,
        },
      })
      .then((response) => {
        console.log(response);
        var dashBoardData_dummy = response.data.map((item) => {
          var ImageSrc =
            item.item_image === null
              ? "http://localhost:3001/images/item_image.avif"
              : `http://localhost:3001/images/${item.item_image}`;
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

          return dashBoardItem;
        });
        setDashBoardData(dashBoardData_dummy);
      });
  }, []);

  return (
    <>
      <div className="container">
        <NavBar />
        <HoverBoard />
      </div>
      <div className="container">
        <h2 className="font-weight-bold text-center mt-4">
          Search results for {search}
        </h2>
        <div className="searchItem">{dashBoardData}</div>
      </div>
    </>
  );
}

export default SearchDashBoard;
