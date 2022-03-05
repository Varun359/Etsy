import React from "react";
import { Route,Routes} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const Main = () => {
  return (
    <div>
      <Routes>
        {/*Render Different Component based on Route*/}
        <Route path="/" element={<Login></Login>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </div>
  );
};
//Export The Main Component
export default Main;
