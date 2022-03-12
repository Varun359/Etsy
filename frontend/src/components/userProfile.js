import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import editUserProfile from "./editUserProfile";
import { Navigate } from "react-router-dom";

const UserProfileShow = () => {
  return (
    <div className="user-profile-show">
      <div className="user-info">
        <div>
          <div>
            {/* <img src={user.imageUrl} /> */}
            <div>
              {/* <h3>{user.fname}</h3> */}
              <h3>Welcome Varun Reddy </h3>
              {/* <Link to={`/users/${user.id}/edit`} className="btn-block">
                <i className="fa fa-pencil" aria-hidden="true"></i>
                Edit profile
              </Link> */}
            </div>
          </div>

          <div className="shop-section">
            <h4>About</h4>
            {/* {shopLogo} */}
          </div>
        </div>
      </div>

      <div className="favorite-lists-navbar">
        <ul>
          <li>
            <Link to="/editProfile">Edit Profile</Link>
          </li>
          <li>
            <a href="#">Favorite items</a>
          </li>
          <li>
            <a href="#">Favorite shops</a>
          </li>
        </ul>
        {/* favorite items, favorite shops  */}
      </div>

      <div className="favorite-list">
        {/* list of items or shops favorited by user */}
        {/* can use an onClick function to show the selected list*/}
      </div>
    </div>
  );
};

export default UserProfileShow;
