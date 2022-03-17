import React, { useState, useEffect } from "react";
import "./css/SignIn.css";
import Register from "./Register";
import { Navigate } from "react-router-dom";
import { Cancel } from "@material-ui/icons";
import axios from "axios";

function SignIn({ isOpen, closeModal, openRe }) {
  const [showRegister, setshowRegister] = useState(false);
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

  // const dispatch = useDispatch();

  const loginHandler = (e) => {
    e.preventDefault();

    // dispatch(
    //   login({
    //     email: email,
    //     password: password,
    //     loggedIn: true,
    //   })
    // );

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
          closeModal(e, true);
        }
      })
      .catch((err) => {
        console.log(err);
        setInvalidCredentials(true);
      });
  };

  useEffect(() => {
    axios
      .get("https://localhost:3000/")
      .then((response) => setEmail(response.data));
  }, []);

  return (
    <>
      {isLoggedIn && <Navigate to="/home" />}
      {isOpen && !showRegister && (
        <>
          <div>
            <div className="signin_modal">
              <div style={{ position: "fixed", right: -30, color: "black" }}>
                <Cancel onClick={(e) => closeModal(e)}></Cancel>
              </div>
              <div className="signin__heading">
                <h4>Sign in</h4>
                <button
                  onClick={(e) => {
                    setshowRegister(true);
                  }}
                  className="signin__register_button"
                >
                  Register
                </button>
              </div>
              <form
                className="signin_form"
                onSubmit={(e) => {
                  loginHandler(e);
                }}
              >
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <br />
                  <input
                    type="email"
                    className="email"
                    id="email"
                    placeholder="Enter email"
                    onChange={emailChangeHandler}
                    value={email}
                    required
                  />
                </div>

                <div className="htmlForm-group">
                  <label htmlFor="password">Password</label>
                  <br />
                  <input
                    onChange={passwordChangeHandler}
                    value={password}
                    type="password"
                    className="password"
                    id="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="forgot_password">
                  <p className="password_forgot">Forgot your password?</p>
                </div>
                <button type="submit" className="btn btn-primary">
                  Sign in
                </button>
              </form>
            </div>
            <div className="bg" onClick={(e) => closeModal(e)} />
          </div>
        </>
      )}
      {showRegister && (
        <Register
          isOpen={showRegister}
          closeModal={(e) => {
            setshowRegister(false);
          }}
          closeSignIn={(e) => {
            closeModal(e, true);
          }}
        />
      )}
    </>
  );
}

export default SignIn;
