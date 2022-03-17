import React, { useState } from "react";
import "./css/shopItem.css";
import EditShopItem from "./EditShopItem";
function ShopItem({ itemId, src, name, shopName, currency, price }) {
  const [showSignIn, setshowSignIn] = useState(false);
  return (
    <div>
      <div className="shopItem__card">
        <div className="shopItem__card-header">
          <img className="shopItem__card-image" src={src} alt={name} />
        </div>
        <div className="shopItem__card-content">
          <h3 className="shopItem__product__name">{name}</h3>
          <div className="shopItem__footer">
            <div>
              <small>{shopName}</small>
              <h3>{`${currency} ${price}`}</h3>
            </div>
            <button
              onClick={(e) => {
                console.log("edit");
                setshowSignIn(true);
              }}
              className="shopItem__add_items"
            >
              {" "}
              Edit{" "}
            </button>
          </div>
        </div>
      </div>
      <EditShopItem
        isOpen={showSignIn}
        closeModal={(e) => {
          setshowSignIn(false);
        }}
      />
    </div>
  );
}

export default ShopItem;
