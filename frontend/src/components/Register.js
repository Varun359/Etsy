import React, { useState } from "react";
import { Cancel } from "@material-ui/icons";
import axios from "axios";
import { Navigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { register } from "../features/userSlice";

function Register({ closeModal, closeSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [created, setCreated] = useState(null);
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const firstNameChangeHandler = (e) => {
    setFirstName(e.target.value);
  };

  // const dispatch = useDispatch();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // dispatch(
    //   register({
    //     email: email,
    //     password: password,
    //     firstName: firstName,
    //     loggedIn: true,
    //   })
    // );
    const data = {
      email: email,
      firstName: firstName,
      password: password,
    };
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3001/register", data)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setEmail("");
          setPassword("");
          setFirstName("");
          setCreated(true);
          closeModal(e, true);
          closeSignIn(e, true);
        }
      })
      .catch((err) => {
        setCreated(false);
        console.log(err);
      });
  };
  return (
    <>
      {created && <Navigate to="/home" />}
      <div>
        <div className="signin_modal">
          <div style={{ position: "fixed", right: -30, color: "black" }}>
            <Cancel onClick={(e) => closeModal(e)}></Cancel>
          </div>
          <div className="signin__heading">
            <h4>Register</h4>
          </div>
          <form className="signin_form" onSubmit={onSubmitHandler}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <br />
              <input
                onChange={emailChangeHandler}
                value={email}
                type="email"
                className="email"
                id="email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <br />
              <input
                onChange={firstNameChangeHandler}
                value={firstName}
                type="text"
                className="email"
                id="firstName"
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
                required
              />
            </div>
            {/* <div className="forgot_password">
              <p className="password_forgot">Forgot your password?</p>
            </div> */}
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
          {created && (
            <p style={{ color: "green" }}> Successfully Registered</p>
          )}
          {created === false && (
            <p style={{ color: "red" }}>Error while registering</p>
          )}
        </div>
        <div className="bg" onClick={(e) => closeModal(e)} />
      </div>
    </>
  );
}

export default Register;
