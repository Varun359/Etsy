import axios from "axios";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router";
import "./css/CreateShop.css";
import HoverBoard from "./HoverBoard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { BASE_URL, KAFKA_BASE_URL } from "../variables";
import { activeShop, selectUser, updateUserShop } from "../features/userSlice";
import { useQuery, useMutation, gql } from "@apollo/client";
import { CREATE_SHOP } from "../Graphql/Mutation";
import { CHECK_SHOP_NAME } from "../Graphql/Queries";
function CreateShop() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const user_local = JSON.parse(localStorage.getItem("user"));
  const userId = user_local.user_id;
  const [shopName, setShopName] = useState("");
  const [checkAvailable, setCheckAvailable] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [cookie, setCookie] = useCookies(["cookie"]);
  const [isCreated, setIsCreated] = useState(false);
  const navigate = useNavigate();

  const { error, loading, data } = useQuery(CHECK_SHOP_NAME, {
    variables: { user_id: userId, shop_name: shopName },
  });
  const [createUserShop] = useMutation(CREATE_SHOP, {
    onCompleted(res) {
      console.log(res);
    },
    onError(e) {
      console.log(e.message);
    },
  });
  const checkShop = () => {
    console.log("hii");

    console.log("The data of graph ql", data);
    if (data.checkShopName.shop_name !== "exist") {
      console.log(data.checkShopName.shop_name);
      setCheckAvailable(true);
    }
    setShowAlert(true);
    // axios
    //   .post(
    //     `${BASE_URL}/checkShop`,
    //     { shop_name: shopName },
    //     {
    //       headers: {
    //         "content-Type": "application/json",
    //         "auth-token": cookie.cookie.token,
    //       },
    //     }
    //   )
    // .then((response) => {

    //   })
    // .catch((err) => {
    //   console.log(err);
    // });
  };
  useEffect(() => {
    console.log("The data in create shop use effect from graphql", data);
  }, [data]);

  const createShop = () => {
    //  axios
    //   .post(
    //     `${BASE_URL}/createShop`,
    //     { shop_name: shopName },
    //     {
    //       headers: {
    //         "content-Type": "application/json",
    //         "auth-token": cookie.cookie.token,
    //       },
    //     }
    //   )
    console.log("User id is ", userId);
    createUserShop({
      variables: {
        user_id: userId,
        shop_name: shopName,
      },
    })
      .then((response) => {
        if (response) {
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
