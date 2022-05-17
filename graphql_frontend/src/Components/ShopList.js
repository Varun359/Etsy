import React, { useEffect, useState } from "react";
// import DashBoardItem from "./DashBoardItem";
import axios from "axios";
import ShopItem from "./ShopItem";
import { BASE_URL, GRAPHQL_BASE_URL } from "../variables";
import { useQuery, useMutation, gql } from "@apollo/client";
import { GET_SHOP_DETAILS, GET_SHOP_DETAILSBYID } from "../Graphql/Queries";
function ShopList({ owner, user_id }) {
  const [cookie, setCookie] = useState(undefined);
  const [shopList, setShopList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const user_local = JSON.parse(localStorage.getItem("user"));

  const [shopName, setShopName] = useState();
  const userId = user_local.user_id;
  const { error, loading, data } = useQuery(GET_SHOP_DETAILSBYID, {
    variables: { user_id: userId },
  });
  useEffect(() => {
    console.log("Data get user details data", data);

    if (data != undefined) {
      console.log(
        "Data get user details data",
        data.getShopDetailsById.shop_name
      );
      setShopName(data.getShopDetailsById.shop_name);
    }
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
        .get(`${BASE_URL}/shopItems/` + user_id, {
          headers: {
            "auth-token": cookie.token,
          },
        })
        .then((response) => {
          console.log(response.data);
          // setShopList(response.data);
          var displayShopList = response.data.map((item) => {
            console.log("Item is ", item);
            var ImageSrc =
              item.item_image === null
                ? `${BASE_URL}/images/item_image.avif`
                : `${item.item_image}`;
            //: `${BASE_URL}/images/${item.item_image}`;
            console.log(ImageSrc);
            console.log("Here is the item which i am sending", item);
            if (item.item_name === null) {
              return null;
            }
            return (
              <ShopItem
                owner={owner}
                key={item._id}
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
  }, [refresh, data]);
  return <div className="shopList__container">{shopList}</div>;
}

export default ShopList;
