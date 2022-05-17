import React, { useState, useEffect } from "react";
import "./css/AddShopItem.css";
import { Cancel } from "@material-ui/icons";
import axios from "axios";
import { useCookies, CookiesProvider } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../variables";
import { s3 } from "./configure";
import { useQuery, useMutation, gql } from "@apollo/client";
import { EDIT_SHOP_ITEM } from "../Graphql/Mutation";

function EditShopItem({ closeModal, setLoginStatus, item }) {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cookie, setCookie] = useCookies(["cookie"]);
  const [updated, setUpdated] = useState(false);
  const [itemImage, setItemImage] = useState("");
  const navigate = useNavigate();
  const changeHandlerGeneric = (value, setterFunc, item_id) => {
    console.log(value);
    setterFunc(value);
  };

  const [editShopItem] = useMutation(EDIT_SHOP_ITEM, {
    onCompleted(res) {
      console.log(res);
    },
    onError(e) {
      console.log(e.message);
    },
  });

  useEffect(() => {
    console.log(item);
    setItemName(item.item_name);
    setCategory(item.item_category);
    setItemDesc(item.item_desc);
    setPrice(item.item_price);
    setQuantity(item.item_quantity);
    setItemImage(item.item_image);
  }, []);

  const changeImage = async (data) => {
    console.log("The data", data.name);
    const formData = new FormData();
    formData.append("UserImage", data);

    console.log("This is in add item Image");

    // changed here
    const imageName = `items/${Date.now()}_${data.name}`;
    console.log(imageName);
    const params = {
      Bucket: "etsyimages",
      Key: imageName,
      Expires: 60,
      ContentType: "image/*",
    };
    const uploadUrl = await s3.getSignedUrlPromise("putObject", params);
    console.log(uploadUrl);
    await fetch(
      new Request(uploadUrl, {
        method: "PUT",
        body: data,
        headers: new Headers({
          "Content-Type": "image/*",
        }),
      })
    );

    const imageUrl = uploadUrl.split("?")[0];

    const imageData = {
      imageUrl,
    };
    setItemImage(imageUrl);
  };

  const submitForm = () => {
    console.log("hello");
    const user = localStorage.getItem("user");
    const data = {
      ...item,
      item_name: itemName,
      item_price: price,
      item_desc: itemDesc,
      item_category: category !== "Custom" ? category : customCategory,
      item_quantity: quantity,
      item_image: itemImage,
    };
    console.log(data);
    const user_local = JSON.parse(localStorage.getItem("user"));
    const userId = user_local.user_id;
    console.log(data);
    // console.log(`${BASE_URL}/editShopItem/${item._id}`);
    // axios
    //   .post(`${BASE_URL}/editShopItem/${item._id}`, data, {
    //     headers: {
    //       "content-Type": "application/json",
    //       "auth-token": cookie.cookie.token,
    //     },
    //   })
    editShopItem({
      variables: {
        item_id: data._id,
        item_name: itemName,
        item_category: category,
        item_desc: itemDesc,
        item_price: price.toString(),
        item_quantity: Number(quantity),
        item_image: itemImage,
      },
    })
      .then((response) => {
        // console.log("Status Code : ", response.status);
        if (response) {
          console.log(response);
          setUpdated(true);
          //console.log("User id ", userId);
          navigate("/shop/" + userId);
        }
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div class="modal" id="editItemModel" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <form
          onSubmit={(e) => {
            submitForm();
            // e.preventDefault();
          }}
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Item Details
              </h5>
              <button
                type="button"
                class="close"
                onClick={closeModal}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">
                  Item Name:
                </label>
                <input
                  value={itemName}
                  onChange={(e) => {
                    changeHandlerGeneric(e.target.value, setItemName);
                  }}
                  type="text"
                  placeholder="Shop Name"
                  class="form-control"
                  id="shop-name"
                />
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">
                  Category:
                </label>
                <select
                  name="category"
                  value={category}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setCategory(e.target.value);
                  }}
                  className="custom-select"
                >
                  <option value="Clothing">Clothing</option>
                  <option value="Jewellery">Jewellery</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Home Decor">Home Decor</option>
                  <option value="Art">Art</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
              {category === "Custom" && (
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">
                    Enter Category:
                  </label>
                  <input
                    value={customCategory}
                    onChange={(e) => {
                      changeHandlerGeneric(e.target.value, setCustomCategory);
                    }}
                    type="text"
                    placeholder="Enter Category"
                    class="form-control"
                    id="custom-category"
                  />
                </div>
              )}
              <div class="form-group">
                <label for="message-text" class="col-form-label">
                  Item Description:
                </label>
                <textarea
                  class="form-control"
                  id="item_desc"
                  placeholder="Item Description"
                  rows="1"
                  cols="30"
                  value={itemDesc}
                  onChange={(e) => {
                    changeHandlerGeneric(e.target.value, setItemDesc);
                  }}
                ></textarea>
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">
                  Quantity:
                </label>
                <input
                  value={quantity}
                  onChange={(e) => {
                    changeHandlerGeneric(e.target.value, setQuantity);
                  }}
                  type="number"
                  class="form-control"
                  id="quantity"
                  min={0}
                />
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">
                  Price :
                </label>
                <input
                  value={price}
                  onChange={(e) => {
                    changeHandlerGeneric(e.target.value, setPrice);
                  }}
                  class="form-control"
                  id="price"
                  min={1}
                  type="text"
                />
              </div>
              <div class="form-group">
                <label for="recipient-name">Edit Image </label>
                <input
                  class="form-control image-control"
                  type="file"
                  onChange={(event) => {
                    console.log("eventtttt", event.target.files);
                    changeImage(event.target.files[0]);
                  }}
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditShopItem;
