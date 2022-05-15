import React from "react";
import "./App.css";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Welcome from "./Components/WelcomePage";
import SignIn from "./Components/SignIn";
import Favorite from "./Components/FavoritePage";
import Profile from "./Components/Profile";
import EditProfile from "./Components/EditProfile";
import Shop from "./Components/Shop";
import CartDashboard from "./Components/CartDashboard";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ItemOverviewPage from "./Components/ItemOverviewPage";
import CreateShop from "./Components/CreateShop";
import SearchDashBoard from "./Components/SearchDashBoard";
import PurchaseDashboard from "./Components/PurchaseDashboard";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/item/:id" element={<ItemOverviewPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/shop/:user_id" element={<Shop />} />
          <Route path="/createshop" element={<CreateShop />} />
          <Route path="/cartitems" element={<CartDashboard />} />
          <Route path="/purchases" element={<PurchaseDashboard />} />
          <Route path="/search/:search" element={<SearchDashBoard />} />
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
