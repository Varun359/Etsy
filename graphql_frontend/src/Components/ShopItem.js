import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/shopItem.css";
import EditShopItem from "./EditShopItem";
function ShopItem({ item, src, currency, owner }) {
  const [showSignIn, setshowSignIn] = useState(false);
  return (
    <>
      <Link to={`/item/${item._id}`} class="card">
        <img class="card-img-top" src={src} alt="Card cap" />
        <div class="card-body">
          <h5 class="card-title">{item.item_name}</h5>
          <div class="d-flex justify-content-between">
            <h4 class="card-text font-weight-bold">{`${currency} ${item.item_price}`}</h4>
            {owner && (
              <button
                onClick={(e) => {
                  console.log("edit");
                  setshowSignIn(true);
                  e.preventDefault();
                }}
                className="btn btn-primary openEdit"
                data-toggle="modal"
                data-target={`#editItemModel`}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </Link>
      {showSignIn && owner && (
        <EditShopItem
          isOpen={showSignIn}
          closeModal={(e) => {
            setshowSignIn(false);
          }}
          item={item}
        />
      )}
    </>
  );
}

export default ShopItem;
