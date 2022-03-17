import React, { useEffect, useState } from "react";
// import DashBoardItem from "./DashBoardItem";
import axios from "axios";
import ShopItem from "./ShopItem";
function ShopList() {
  const [cookie, setCookie] = useState(undefined);
  const [shopList, setShopList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    var cookies = decodeURIComponent(document.cookie).split(";");
    cookies.forEach((cookieEle) => {
      console.log(cookieEle);
      console.log(cookieEle.indexOf("cookie=j:"));
      if (cookieEle.indexOf("cookie=j:") !== -1) {
        if (cookieEle.replace("cookie=j:", "") !== cookie) {
          setRefresh(true);
          setCookie(JSON.parse(cookieEle.replace("cookie=j:", "")));
        }
        console.log(cookie);
      }
    });
    if (cookie !== undefined)
      axios
        .get("http://localhost:3001/shopItems", {
          headers: {
            "auth-token": cookie.token,
          },
        })
        .then((response) => {
          console.log(response.data);
          // setShopList(response.data);
          var displayShopList = response.data.map((item) => {
            var ImageSrc =
              item.item_image === null
                ? require("../images/item_image.avif")
                : require(`../images/${item.item_image}`);
            console.log(ImageSrc);
            if (item.item_name === null) {
              return null;
            }
            return (
              <ShopItem
                key={item.item_id}
                itemId={item.item_id}
                src={ImageSrc}
                name={item.item_name}
                shopName={item.shop_name}
                price={item.item_price}
                currency={"$"}
              />
            );
          });

          setShopList(displayShopList);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [refresh]);
  return <div className="shopList__container">{shopList}</div>;
}

export default ShopList;
