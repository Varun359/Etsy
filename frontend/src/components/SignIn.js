import React, { useState, useEffect } from "react";
import "./css/SignIn.css";
import Register from "./Register";
import { Navigate } from "react-router-dom";
import { Cancel } from "@material-ui/icons";
import axios from "axios";

function SignIn({ handleTriggerRefresh, isOpen, closeModal, openRe }) {
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
          localStorage.setItem("user", JSON.stringify(response.data));
          handleTriggerRefresh();
          if (!response.data.shop_name) {
            axios
              .post("http://localhost:3001/login", data)
              .then((response) => {});
          }
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
        <div class="modal" id="signInModel" role="dialog" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <form
              onSubmit={(e) => {
                loginHandler(e);
              }}
            >
              <div class="modal-content">
                <div class="modal-header">
                  <div
                    style={{ diaplay: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <h5 class="modal-title" id="exampleModalLabel">
                        Sign In
                      </h5>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="close"
                    onClick={closeModal}
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">
                      Email Address:
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter email"
                      onChange={emailChangeHandler}
                      value={email}
                      required
                      className="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="message-text" class="col-form-label">
                      Password:
                    </label>
                    <input
                      onChange={passwordChangeHandler}
                      value={password}
                      type="password"
                      id="password"
                      placeholder="Password"
                      className="form-control"
                      required
                    />
                  </div>
                  {/* <div className="forgot_password">
                                        <p className="password_forgot">
                                            Forgot your password?
                                        </p>
                                    </div> */}
                </div>

                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-info"
                    onClick={() => {
                      console.log("onclick");
                      setshowRegister(true);
                    }}
                  >
                    Register
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" class="btn btn-primary">
                    Sign In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {showRegister && (
        <Register
          handleTriggerRefresh={handleTriggerRefresh}
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
