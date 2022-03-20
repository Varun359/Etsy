import React, { useState, useEffect } from "react";
import HoverBoard from "./HoverBoard";
import NavBar from "./NavBar";
import DashBoard from "./DashBoard";
import CartItems from "./CartItems";
import "./css/home.css";
import Footer from "./Footer";
import HomeContext from "./Home-Context";
import CurrencyModal from "./CurrencyModal";
function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [currencyObject, setCurrencyObject] = useState({
        value: "$ United States Dollar (USD)",
        label: "$ United States Dollar (USD)",
        Currency_code: "(USD)",
        Symbol: "$",
    });
    const values = {
        currencyObject,
        setCurrencyObject,
    };
    return (
        <HomeContext.Provider value={values}>
            <div className="container">
                <NavBar
                    callBack={() => {
                        setIsLoggedIn(!isLoggedIn);
                    }}
                />
                <HoverBoard />
            </div>
            <hr
                style={{
                    border: "1px solid rgba(34, 34, 34, 0.15)",
                }}
            ></hr>
            <div className="container">
                <h2 className="font-weight-bold text-center mt-4">
                    Welcome to Etsy
                </h2>
                <DashBoard loggedIn={isLoggedIn} />
            </div>
            <div>
                <CurrencyModal />
            </div>
        </HomeContext.Provider>
    );
}

export default Home;
