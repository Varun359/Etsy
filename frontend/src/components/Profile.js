import React, { useEffect } from "react";
import NavBar from "./NavBar";
import HoverBoard from "./HoverBoard";
import { useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile";
function Profile() {
  return (
    <>
      <div className="container ">
        <NavBar />
        <HoverBoard />
      </div>
      <hr
        style={{
          border: "1px solid rgba(34, 34, 34, 0.15)",
        }}
      ></hr>
      <div className="container">
        <EditProfile />
      </div>
    </>
  );
}

export default Profile;
