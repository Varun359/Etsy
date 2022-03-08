import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Register = () => {
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

  const onSubmitHandler = (e) => {
    const data = {
      email: email,
      firstName: firstName,
      password: password,
    };
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3001/create", data)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setEmail("");
          setPassword("");
          setFirstName("");
          setCreated(true);
        }
      })
      .catch((err) => {
        setCreated(false);
        console.log(err);
      });
  };
  return (
    <div class="container">
      {created && <Navigate to="/home" />}
      <div class="login-form">
        <div class="main-div">
          <div class="panel">
            <h2>Register</h2>
            <p>Please enter your details</p>
            {/* {this.state.invalidCredentials && <p>Invalid Credentials</p>} */}
          </div>

          <form onSubmit={onSubmitHandler}>
            <div class="form-group">
              <input
                required
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
                required
                onChange={firstNameChangeHandler}
                value={firstName}
                type="text"
                class="form-control"
                name="FirstName"
                placeholder="First Name"
              />
            </div>
            <div class="form-group">
              <input
                required
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
          {created && (
            <p style={{ color: "green" }}> Successfully Registered</p>
          )}
          {created === false && (
            <p style={{ color: "red" }}>Errror while registering</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
