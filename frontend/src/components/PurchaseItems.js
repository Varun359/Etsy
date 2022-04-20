import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router";
import "./css/itemOverviewPage.css";
import HoverBoard from "./HoverBoard";
import _ from "lodash";
import { BASE_URL } from "../variables";

function PurchaseItems() {
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [cookie, setCookie] = useCookies(["cookie"]);
  const [orders, setOrders] = useState([]);
  const [groups, setGroups] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [leftPage, setLeftPage] = useState(true);
  const [rightPage, setRightPage] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/orders`, {
        headers: {
          "content-Type": "application/json",
          "auth-token": cookie.cookie.token,
        },
      })
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);
          setOrders(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    console.log("in second use effect");
    if (orders.length > 0) {
      let data = null;
      let list = [];
      data = _.groupBy(orders, (item) => {
        return item.order_id;
      });
      console.log("data", data);
      console.log("groups", Object.entries(data));
      let sample = Object.entries(data);
      sample.forEach((item) => {
        console.log(item);
        list.push(item[1]);
      });

      console.log("The list", list);

      const startindex = (page - 1) * limit;
      const endindex = page * limit;
      const orders_count = list.length;
      list = list.slice(startindex, endindex);

      setGroups(list);

      if (page <= 1) {
        setLeftPage(false);
      } else {
        setLeftPage(true);
      }
      if (
        orders_count === page * limit ||
        list.length < limit ||
        list.length === 0
      ) {
        setRightPage(false);
      } else {
        setRightPage(true);
      }
    }
  }, [orders, page, limit]);

  const leftclick = () => {
    if (!rightPage) {
      setRightPage(true);
    }
    setPage(page - 1);
  };

  const rightclick = () => {
    if (!leftPage) {
      setLeftPage(true);
    }
    setPage(page + 1);
  };

  const setLimitFunction = (e) => {
    setLimit(e.target.value);
    setPage(1);
  };

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

  const handleGroupSum = (data) => {
    let sum = 0;
    let totalPrice = 0;
    data.map((item) => {
      console.log("item", item);
      sum += item.price_buyed;
    });
    console.log("sum", sum);
    return (Math.round(sum * 100) / 100).toFixed(2);
  };
  const itemsObject = {};

  const indexOfLastOrder = currentPage * postsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - postsPerPage;
  const currentOrders = groups.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div className="purchase_container">
      {console.log("groups are", groups)}
      <div style={{ fontSize: "1.5rem", fontWeight: "bold" }} sm={3}>
        Select orders per page:
        <select type="select" onChange={(e) => setLimitFunction(e)}>
          <option key={1} value={2}>
            {2}
          </option>
          <option key={2} selected value={5}>
            {5}
          </option>
          <option key={3} value={10}>
            {10}
          </option>
        </select>{" "}
      </div>

      <div className="float-right">
        <button
          disabled={!rightPage}
          onClick={rightclick}
          className="float-right"
        >
          Next
        </button>
      </div>

      <div sm={3} className="float-right">
        Page {page}
      </div>

      <div className="float-right">
        <button
          disabled={!leftPage}
          onClick={leftclick}
          className="float-right"
        >
          Prev
        </button>
      </div>

      {groups.map((group) => (
        <div className="purchase_item d-flex flex-column">
          <h2 className="font-weight-bold">
            {console.log("Date issss", group[0].date)}
            {console.log("Order id issss", group[0].order_id)}
            Order placed on {new Date(group[0].date).toDateString()}
          </h2>
          <h5>Order Id : #{group[0].order_id} </h5>

          {group.map((item) => (
            <div className="d-flex cart_cart">
              <img className="product_img_cart" src={getImgSrc(item)} alt="" />
              <div className="info_cart d-flex justify-content-between">
                <div className="purchase_item__content-width d-flex flex-column">
                  <h4 className="font-weight-bold">{item.item_name}</h4>
                  <h4>{item.shop_name} </h4>
                  <span className="mr-2">Quantity - {item.quantity_buyed}</span>
                  {console.log(item.gift)}
                  {item.gift !== null && (
                    <span className="mr-2">Gift : {item.gift}</span>
                  )}
                </div>
                <div>
                  <h2 className="font-weight-bold">${item.price_buyed}</h2>
                </div>
              </div>
            </div>
          ))}

          <div className="purchase_item_class mt-3 float-right">
            <h2 className="float-right">
              <b>Total Price : ${handleGroupSum(group)}</b>
            </h2>
          </div>
          <hr></hr>
        </div>
      ))}
    </div>
  );
}

export default PurchaseItems;
