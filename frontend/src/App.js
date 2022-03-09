import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import "antd/dist/antd.css";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Main />
      </div>
    </BrowserRouter>
  );
};

export default App;
