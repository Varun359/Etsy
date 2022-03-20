import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useParams } from "react-router";
import "./css/itemOverviewPage.css";
import HoverBoard from "./HoverBoard";
import { useNavigate } from "react-router-dom";

function CartItems() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [cookie, setCookie] = useCookies(["cookie"]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/CartItems", {
        headers: {
          "content-Type": "application/json",
          "auth-token": cookie.cookie.token,
        },
      })
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);
          setItems(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getImgSrc = (item) => {
    return item.item_image === null
      ? "http://localhost:3001/images/item_image.avif"
      : `http://localhost:3001/images/${item.item_image}`;
  };

  const changeQuantity = (value) => {
    if (value > 0 && value < 10) {
      setQuantity(value);
    }
  };
  const handleProceedToCheckOut = () => {
    const purchaseData = {
      dateOfPurchase: new Date(),
      items: items,
    };
    console.log("purchaseData", purchaseData);
    console.log(cookie.cookie.token);
    axios
      .post("http://localhost:3001/purchasingItems", purchaseData, {
        headers: {
          "content-Type": "application/json",
          "auth-token": cookie.cookie.token,
        },
      })
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);
          navigate("/purchases");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // navigate("/purchases", { state: { items } });
  };
  const itemsObject = {};
  return (
    <div>
      {items.length > 0 && (
        <div className="proceed_button">
          <button
            className="btn btn-primary"
            onClick={(e) => {
              handleProceedToCheckOut(e);
            }}
          >
            Proceed to checkout
          </button>
        </div>
      )}
      {items.map((item) => (
        <div className="d-flex mx-auto cart_cart">
          <img className="product_img_cart" src={getImgSrc(item)} alt="" />
          <div className="info_cart d-flex flex-column justify-content-between">
            <div>
              <h3 className="font-weight-bold">{item.item_name}</h3>
              <h4>{item.shop_name} </h4>
              <p>Bought by {item.sales_count ? item.sales_count : 0}</p>
              <h2 className="font-weight-bold">${item.item_price}</h2>
              <span className="mr-2">Quantity - {item.quantity}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartItems;
