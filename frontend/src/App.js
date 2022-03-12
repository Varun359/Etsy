import React from "react";
import "./App.css";
import { BrowserRouter, UseContext } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Main from "./components/Main";
import "antd/dist/antd.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Header from "./components/Header";
import Header1 from "./components/Header1";
import UserProfile from "./components/userProfile";
import ShopCreate from "./components/shop/shopCreate";
import Header2 from "./components/Header2";
import Footer from "./components/Footer";
import ShopShow from "./components/shop/shopShow";
import EditUserProfile from "./components/editUserProfile";
export const UserContext = createContext();

const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const isLoggedin = async () => {
      let token = localStorage.getItem("auth-token");
      if (token == null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      // const tokenResponse = await axios.post(

      // )
    };
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Header2 />

        <UserContext.Provider value={{ userData, setUserData }}>
          <Routes>
            {/*Render Different Component based on Route*/}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login></Login>} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/editProfile" element={<EditUserProfile />} />
            <Route path="/shopCreate" element={<ShopCreate />} />
            <Route path="/shopShow" element={<ShopCreate />} />
          </Routes>
        </UserContext.Provider>
        <Footer />
      </BrowserRouter>
      {/* // <BrowserRouter>
    //   <div>
    //     <Main />
    //   </div>
    // </BrowserRouter> */}
    </div>
  );
};

export default App;
