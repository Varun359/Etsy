import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router";
import "./css/CreateShop.css";
import HoverBoard from "./HoverBoard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { BASE_URL, KAFKA_BASE_URL } from "../variables";
import { activeShop, selectUser, updateUserShop } from "../features/userSlice";

function CreateShop() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [shopName, setShopName] = useState("");
  const [checkAvailable, setCheckAvailable] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [cookie, setCookie] = useCookies(["cookie"]);
  const [isCreated, setIsCreated] = useState(false);
  const navigate = useNavigate();
  const checkShop = () => {
    console.log("hii");
    axios
      .post(
        `${BASE_URL}/checkShop`,
        { shop_name: shopName },
        {
          headers: {
            "content-Type": "application/json",
            "auth-token": cookie.cookie.token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.status === 200 && !response.data) {
          console.log(response.data);
          setCheckAvailable(true);
        }
        setShowAlert(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createShop = () => {
    axios
      .post(
        `${BASE_URL}/createShop`,
        { shop_name: shopName },
        {
          headers: {
            "content-Type": "application/json",
            "auth-token": cookie.cookie.token,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setIsCreated(true);
        }
        dispatch(
          updateUserShop({
            shop_name: shopName,
          })
        );
        setShowAlert(false);
        setTimeout(() => {
          navigate("/favorite");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container">
        <NavBar />
        <HoverBoard />
      </div>
      <hr
        style={{
          border: "1px solid rgba(34, 34, 34, 0.15)",
        }}
      ></hr>
      <div className="container">
        <div className="jumbotron text-center">
          <h1 className="display-5">Name your shop</h1>
          <p className="lead">
            Choose a memorable name that reflects your style.
          </p>
          {showAlert ? (
            checkAvailable ? (
              <div class="alert alert-info" role="alert">
                Shop name is available
              </div>
            ) : (
              <div class="alert alert-danger" role="alert">
                Shop name is not available
              </div>
            )
          ) : isCreated ? (
            <div class="alert alert-success" role="alert">
              Shop Created Succesfully
            </div>
          ) : (
            ""
          )}

          <div className="d-flex align-items-center shop-form mx-auto">
            <input
              type="text"
              className="form-control"
              placeholder="Type a shop name that you want..."
              value={shopName}
              onChange={(e) => {
                setShopName(e.target.value);
              }}
            />
            {checkAvailable ? (
              <button className="btn btn-primary" onClick={createShop}>
                Create Shop
              </button>
            ) : (
              <button className="btn btn-primary" onClick={checkShop}>
                Check Availability
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateShop;
