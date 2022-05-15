import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useParams } from "react-router";
import "./css/itemOverviewPage.css";
import HoverBoard from "./HoverBoard";
import NavBar from "./NavBar";
import DashboardContext from "./Dashboard-context";
import HomeContext from "./Home-Context";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL, KAFKA_BASE_URL } from "../variables";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../features/cartItemSlice";
import { selectUser } from "../features/userSlice";
function ItemOverviewPage() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cookie, setCookie] = useCookies(["cookie"]);

  const { cartCount, setCartCount } = useContext(DashboardContext);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/itemDetails/${id}`, {
        headers: {
          "content-Type": "application/json",
          "auth-token": cookie.cookie.token,
        },
      })
      .then((response) => {
        console.log("Response : ", response.data);
        // console.log(response.data[0]);
        // setItem(response.data[0]);
        console.log("in item Overview use effect", response.data);
        setItem(response.data);
      });
  }, []);

  const getImgSrc = (item) => {
    return item.item_image === null
      ? `${BASE_URL}/images/item_image.avif`
      : `${item.item_image}`;
  };

  const changeQuantity = (value) => {
    if (value > 0 && value <= item.item_quantity) {
      setQuantity(value);
    }
  };

  const handleAddToCart = (e) => {
    console.log(item);
    const cartData = {
      item_id: id,
      quantity: quantity,
      gift: null,
      give_gift: false,
      shop_name: item.shop_name,
    };
    console.log("cartData", item);
    // const user_now =  useSelector(selectUser);
    // console.log("User",user_now)
    let user_now = cookie.cookie.user_id;
    console.log(cookie.cookie.token);
    dispatch(
      addItemToCart({
        ...item,
        quantity,
        gift: null,
        give_gift: false,
        user_id: user_now,
      })
    );
    navigate("/");
    // axios
    //   .post(`${BASE_URL}/AddToCart`, cartData, {
    //     headers: {
    //       "content-Type": "application/json",
    //       "auth-token": cookie.cookie.token,
    //     },
    //   })
    //   .then((response) => {
    //     console.log("Status Code : ", response.status);
    //     if (response.status === 200) {
    //       console.log(response.data);
    //       setCartCount(response.data.length);
    //       navigate("/");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <div>
      <div className="container">
        <NavBar />
        <HoverBoard />
      </div>
      {item && (
        <div className="d-flex mx-auto cart">
          <img className="product_img" src={getImgSrc(item)} alt="" />
          <div className="info d-flex flex-column justify-content-between">
            <div>
              <h3 className="font-weight-bold">{item.item_name}</h3>
              {console.log("IN ITEM OVERVIEW", item)}
              <Link to={"/shop/" + item.user_id}>
                <h4>{item.shop_name}</h4>{" "}
              </Link>
              <p>Bought by {item.sales_count ? item.sales_count : 0}</p>
              <h2 className="font-weight-bold">${item.item_price}</h2>
              <p>{item.item_desc}</p>
            </div>
            {item.item_quantity > 0 ? (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="mr-2">Quantity</span>
                  <div className="d-flex align-items-center">
                    <button
                      className="quant btn btn-secondary font-weight-bold"
                      onClick={() => {
                        changeQuantity(quantity - 1);
                      }}
                    >
                      -
                    </button>
                    <h4 className="border px-3 py-2 mb-0">{quantity}</h4>
                    <button
                      className="quant btn btn-secondary font-weight-bold"
                      onClick={() => {
                        changeQuantity(quantity + 1);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="btn btn-success btn-lg btn-block"
                  tabindex="0"
                  onClick={(e) => handleAddToCart(e)}
                >
                  <i className="fa fa-shopping-cart"></i> Add to Cart
                </button>
              </div>
            ) : (
              <h4 className="btn btn-danger btn-lg btn-block">
                <i className="fa fa-shopping-cart"></i> Unavailable
              </h4>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemOverviewPage;
