import React from "react";
import { withRouter, Link } from "react-router-dom";

const ShopShow = () => {
  return (
    <div className="shop-show">
      <div className="shop-show-header">
        <div className="shop-logo">
          {/* <img src={shop.imageUrl} /> */}
          {/* {stockItemButton} */}
        </div>

        <div className="shop-info">
          <div className="shop-name-show"></div>
          <div className="favorite-shop">
            <i className="fa fa-heart-o" aria-hidden="true"></i>
            Favorite shop ()
          </div>
        </div>

        <div className="owner-info">
          <p>Shop owner</p>
          {/* <img src={shop.profilePicUrl} id="owner-info-image" /> */}
          <div className="shop-owner-name"></div>
          <div className="shop-owner-email">
            <i className="fa fa-envelope-o" aria-hidden="true"></i>
          </div>
        </div>
      </div>

      <div className="products-listing">
        <label>All items</label>
        <ul></ul>
      </div>
    </div>
  );
};

export default ShopShow;
