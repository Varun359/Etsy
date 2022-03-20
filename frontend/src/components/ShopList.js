import React, { useEffect, useState } from "react";
// import DashBoardItem from "./DashBoardItem";
import axios from "axios";
import ShopItem from "./ShopItem";
function ShopList({ owner, user_id }) {
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
        .get("http://localhost:3001/shopItems/" + user_id, {
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
                ? "http://localhost:3001/images/item_image.avif"
                : `http://localhost:3001/images/${item.item_image}`;
            console.log(ImageSrc);
            if (item.item_name === null) {
              return null;
            }
            return (
              <ShopItem
                owner={owner}
                key={item.item_id}
                item={item}
                src={ImageSrc}
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
