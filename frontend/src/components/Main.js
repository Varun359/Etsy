import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Header from "./Header";
import UserProfile from "./userProfile";
const Main = () => {
  return (
    <div>
      <Header />
      <Routes>
        {/*Render Different Component based on Route*/}
        <Route path="/" element={<Login></Login>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/userProfile" element={<UserProfile />} />
      </Routes>
    </div>
  );
};
//Export The Main Component
export default Main;
