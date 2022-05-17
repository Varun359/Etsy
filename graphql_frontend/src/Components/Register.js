import React, { useEffect, useState } from "react";
import { Cancel } from "@material-ui/icons";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { BASE_URL, GRAPHQL_BASE_URL } from "../variables";
import { useDispatch } from "react-redux";
import { register } from "../features/userSlice";
import { useQuery, useMutation, gql } from "@apollo/client";
import { REGISTER } from "../Graphql/Mutation";
let registerData = {};
function Register({ handleTriggerRefresh, closeModal, closeSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [created, setCreated] = useState(null);

  const [user_register] = useMutation(REGISTER, {
    onCompleted(res) {
      console.log(res);
    },
    onError(e) {
      console.log(e.message);
    },
  });

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const firstNameChangeHandler = (e) => {
    setFirstName(e.target.value);
  };

  const dispatch = useDispatch();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      register({
        email: email,
        // password: password,
        first_name: first_name,
        loggedIn: true,
      })
    );
    const data = {
      email: email,
      first_name: first_name,
      password: password,
    };
    console.log("The data for sending to graphql", data);
    e.preventDefault();
    // axios.defaults.withCredentials = true;
    // axios.post(`${GRAPHQL_BASE_URL}/register`, data);
    user_register({
      variables: {
        email: data.email,
        first_name: data.first_name,
        password: data.password,
      },
    })
      .then((response) => {
        if (response) {
          console.log(response);

          const data = {
            email: response.data.email,
            password: password,
          };
          registerData = data;
          console.log("data", data);

          // axios
          //   .post(`${GRAPHQL_BASE_URL}/login`, registerData)
          //   .then((response) => {
          //     console.log("Status Code : ", response.status);
          //     if (response.status === 200) {
          //       localStorage.setItem("user", JSON.stringify(response.data));
          //       if (!response.data.shop_name) {
          //         axios
          //           .post(`${GRAPHQL_BASE_URL}/login`, registerData)
          //           .then((response) => {
          //             handleTriggerRefresh();
          //           });
          //       }
          //     }
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });
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
  //   useEffect(() => {
  //     console.log("inside login after register", registerData);
  //     if (created) {
  //       console.log("inside login after register", registerData);
  //       axios
  //         .post("http://localhost:3001/login", registerData)
  //         .then((response) => {
  //           console.log("Status Code : ", response.status);
  //           if (response.status === 200) {
  //             localStorage.setItem("user", JSON.stringify(response.data));
  //             if (!response.data.shop_name) {
  //               axios
  //                 .post("http://localhost:3001/login", registerData)
  //                 .then((response) => {});
  //             }
  //           }
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   }, [created]);
  return (
    <>
      <div class="modal" id="signInModel" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
          {created && (
            <p style={{ color: "green" }}> Successfully Registered</p>
          )}
          {created === false && (
            <p style={{ color: "red" }}>Error while registering</p>
          )}
          <form onSubmit={onSubmitHandler}>
            <div class="modal-content">
              <div class="modal-header">
                <div
                  style={{ diaplay: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <h5 class="modal-title" id="exampleModalLabel">
                      Register
                    </h5>
                  </div>
                  {/* <div>
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={() => {
                        console.log("onclick");
                        setshowRegister(true);
                      }}
                    >
                      Register
                    </button>
                  </div> */}
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
                  <label for="recipient-name" class="col-form-label">
                    First Name:
                  </label>
                  <input
                    type="first_name"
                    id="first_name"
                    placeholder="Enter First name"
                    onChange={firstNameChangeHandler}
                    value={first_name}
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
                  class="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" class="btn btn-primary">
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
