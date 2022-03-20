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
            //   {
            //     groups.map((group) => console.log("group", group));
            //   }
            //   console.log(sample);
            setGroups(list);
        }
    }, [orders]);

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
    return (
        <div className="purchase_container">
            {groups.map((group) => (
                <div className="purchase_item d-flex flex-column">
                    <h2 className="font-weight-bold">
                        Order placed on{" "}
                        {new Date(group[0].dateOfPurchase).toDateString()}
                    </h2>
                    <h5>Order Id : #{group[0].order_id} </h5>

                    {group.map((item) => (
                        <div className="d-flex cart_cart">
                            <img
                                className="product_img_cart"
                                src={getImgSrc(item)}
                                alt=""
                            />
                            <div className="info_cart d-flex justify-content-between">
                                <div className="purchase_item__content-width d-flex flex-column">
                                    <h4 className="font-weight-bold">
                                        {item.item_name}
                                    </h4>
                                    <h4>{item.shop_name} </h4>
                                    <span className="mr-2">
                                        Quantity - {item.quantity_buyed}
                                    </span>
                                </div>
                                <div>
                                    <h2 className="font-weight-bold">
                                        ${item.price_buyed}
                                    </h2>
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
