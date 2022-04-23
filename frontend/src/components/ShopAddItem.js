import React, { useState } from "react";
import "./css/AddShopItem.css";
import { Cancel } from "@material-ui/icons";
import axios from "axios";
import { useCookies, CookiesProvider } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../variables";
import { s3 } from "./configure";

function ShopAddItem({ isOpen, closeModal, setLoginStatus }) {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cookie, setCookie] = useCookies(["cookie"]);
  const [updated, setUpdated] = useState(false);
  const [itemImage, setItemImage] = useState(
    `${BASE_URL}/images/shop_default.png`
  );
  const navigate = useNavigate();

  const changeHandlerGeneric = (value, setterFunc) => {
    console.log(value);
    setterFunc(value);
  };
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
    const user = localStorage.getItem("user");
    console.log("user is .......", user);
    // e.preventDefault();
    console.log(cookie);
    const data = {
      itemName: itemName,
      category: category !== "Custom" ? category : customCategory,
      itemDesc: itemDesc,
      price: price,
      quantity: quantity,
      itemImage: itemImage,
    };
    console.log(data);
    //localStorage.setItem("shopdata", JSON.stringify(data));
    console.log(cookie.cookie.token);
    axios
      .post(`${BASE_URL}/insertItems`, data, {
        headers: {
          "content-Type": "application/json",
          "auth-token": cookie.cookie.token,
        },
      })
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response, "user", user);
          setUpdated(true);
          setItemName("");
          setCategory("");
          setItemDesc("");
          setPrice("");
          setQuantity("");
          setItemImage("");
        }
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {isOpen && (
        <div class="modal" id="editItemModel" role="dialog" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <form
              onSubmit={(e) => {
                submitForm();
              }}
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Add Item Details
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
                      placeholder="Item Name"
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
                          changeHandlerGeneric(
                            e.target.value,
                            setCustomCategory
                          );
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
                      min={1}
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
                    />
                  </div>
                  {/* Edited from here to add image */}
                  <div class="form-group">
                    {/* <img
                      className="col-form-label"
                      src={itemImage}
                      alt={itemName}
                    /> */}
                    <label for="recipient-name">Add Image </label>
                    <input
                      //   onChange={(event) => {
                      //     console.log(event.target.files);
                      //     setItemImage(event.target.files[0]);
                      //   }}
                      class="form-control image-control"
                      type="file"
                      onChange={(event) => {
                        console.log("eventtttt", event.target.files);
                        changeImage(event.target.files[0]);
                      }}
                      //   id="img"
                      //   name="img"
                      //   accept="image/*"
                    />
                    {/* <input
                      type="file"
                      name="userImage"
                      id="profile-picture"
                      //   onChange={(event) => {
                      //     setUserImage(event.target.files[0]);
                      //   }}
                      style={{ marginLeft: "40px" }}
                    /> */}
                  </div>
                  {/* edited till here */}
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
      )}
    </>
  );
}

export default ShopAddItem;
