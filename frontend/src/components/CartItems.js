import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useParams } from "react-router";
import "./css/itemOverviewPage.css";
import HoverBoard from "./HoverBoard";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../variables";

import { useDispatch, useSelector } from "react-redux";
import { getCartItems, clearCart } from "../features/cartItemSlice";
import {
  addAllCartItems,
  addCartItemQuantity,
  deleteCartItemQuantity,
  deleteCartItem,
} from "../features/cartItemSlice";
import { CheckBox } from "@material-ui/icons";

function CartItems() {
  const dispatch = useDispatch();
  const cartItems = useSelector(getCartItems);

  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [cookie, setCookie] = useCookies(["cookie"]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log(cartItems);
    if (cartItems.length === 0) {
      axios
        .get(`${BASE_URL}/CartItems`, {
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
            dispatch(addAllCartItems(response.data));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setItems(cartItems);
    }
  }, []);

  const getImgSrc = (item) => {
    return item.item_image === null
      ? `${BASE_URL}/images/item_image.avif`
      : `${BASE_URL}/images/${item.item_image}`;
  };

  const changeQuantity = (value) => {
    if (value > 0 && value < 10) {
      setQuantity(value);
    }
  };
  const changeQuantityToAdd = (e, item) => {
    dispatch(
      addCartItemQuantity({
        user_id: item.user_id,
        item_id: item.item_id,
        quantity: item.quantity,
        item_name: item.item_name,
        item_price: item.item_price,
        item_image: item.item_image,
        item_desc: item.item_desc,
        item_category: item.item_category,
        shop_name: item.shop_name,
        item_quantity: item.item_quantity,
      })
    );
  };

  const changeQuantityToRemove = (e, item) => {
    dispatch(
      deleteCartItemQuantity({
        user_id: item.user_id,
        item_id: item.item_id,
        quantity: item.quantity,
        item_name: item.item_name,
        item_price: item.item_price,
        item_image: item.item_image,
        item_desc: item.item_desc,
        item_category: item.item_category,
        shop_name: item.shop_name,
        item_quantity: item.item_quantity,
      })
    );
  };
  const removeItemHandler = (e, item) => {
    dispatch(
      deleteCartItem({
        item_id: item.item_id,
      })
    );
  };

  const handleProceedToCheckOut = () => {
    const purchaseData = {
      dateOfPurchase: new Date(),
      items: items,
    };
    console.log("purchaseData", purchaseData);
    console.log(cookie.cookie.token);
    axios
      .post(`${BASE_URL}/purchasingItems`, purchaseData, {
        headers: {
          "content-Type": "application/json",
          "auth-token": cookie.cookie.token,
        },
      })
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);
          dispatch(clearCart());
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
    <div className="container my-5">
      {cartItems.length > 0 && (
        <div className="proceed_button my-5">
          <h3 className="font-weight-bold">
            Total Price: $
            {cartItems &&
              cartItems
                .map((a) => a.item_price * a.quantity)
                .reduce((a, b) => Math.round((a + b) * 100) / 100)}
          </h3>
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
      {cartItems.map((item) => (
        <div className="d-flex cart_cart">
          <img className="product_img_cart" src={getImgSrc(item)} alt="" />
          <div className="info_cart d-flex justify-content-between">
            <div className="purchase_item__content-width d-flex flex-column">
              <h4 className="font-weight-bold">{item.item_name}</h4>
              <h4>{item.shop_name} </h4>
              {console.log("HHHHHHHHHHHHHHHHHHHHHH::", item)}
              <span>
                <button
                  onClick={(e) => {
                    changeQuantityToAdd(e, item);
                  }}
                >
                  +
                </button>
                <button
                  onClick={(e) => {
                    changeQuantityToRemove(e, item);
                  }}
                >
                  -
                </button>
              </span>

              <h5 className="mr-2">Quantity - {item.quantity}</h5>
              <div>
                <input
                  type="checkbox"
                  id="check"
                  style={{ marginBottom: "26px" }}
                />
                <label for="check"> Send a gift</label>
              </div>
            </div>
            <div>
              <h2 className="font-weight-bold">
                ${Math.round(item.item_price * item.quantity * 100) / 100}
              </h2>
              <button
                onClick={(e) => {
                  removeItemHandler(e, item);
                }}
              >
                delete{" "}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartItems;
