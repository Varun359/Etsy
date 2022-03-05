import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inValidCredentials, setInvalidCredentials] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const loginHandler = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3001/login", data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          setEmail("");
          setPassword("");
          setInvalidCredentials(false);
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setInvalidCredentials(true);
      });
  };
  return (
    <div class="container">
      {isLoggedIn && <Navigate to="/home" />}

      <div class="login-form">
        <div class="main-div">
          <div class="panel">
            <h2>Login</h2>
            <p>Please enter your username and password</p>
            {inValidCredentials && (
              <p style={{ colr: "red" }}>Invalid Email or Password</p>
            )}
          </div>
          <form onSubmit={loginHandler}>
            <div class="form-group">
              <input
                onChange={emailChangeHandler}
                value={email}
                type="email"
                class="form-control"
                name="email"
                placeholder="email"
              />
            </div>
            <div class="form-group">
              <input
                onChange={passwordChangeHandler}
                value={password}
                type="password"
                class="form-control"
                name="password"
                placeholder="Password"
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
