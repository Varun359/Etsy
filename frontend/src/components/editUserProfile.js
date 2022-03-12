import React, { useState, useEffect, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import countryList from "react-select-country-list";
import { Select } from "antd";
import { useCookies, CookiesProvider } from "react-cookie";
import axios from "axios";
const EditUserProfile = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Rather Not say");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [about, setAbout] = useState("");
  const [date, setDate] = useState(new Date());
  const [country, setCountry] = useState("United States");
  const options = useMemo(() => countryList().getData(), []);

  const [cookie, setCookie] = useCookies(["cookie"]);
  const [updated, setUpdated] = useState(false);
  const changeHandlerGeneric = (value, setterFunc) => {
    console.log(value);
    setterFunc(value);
  };
  const changeHandler = (value) => {
    console.log(value);
    setCountry(value);
  };
  const updateProfile = () => {
    const data = {
      name: name,
      gender: gender,
      city: city,
      phone_no: phone,
      address: address,
      country: country,
      email: email,
      date: date,
      about: about,
    };
    axios
      .post("http://localhost:3001/updateProfile", data, {
        headers: {
          "auth-token": cookie.cookie.token,
        },
      })
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response);
          setUpdated(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:3001/profile", {
        headers: {
          "auth-token": cookie.cookie.token,
        },
      })
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response);
          setName(response.data.first_name);
          setGender(response.data.gender);
          setCity(response.data.city);
          setEmail(response.data.email);
          setPhone(response.data.phone_no);
          setAddress(response.data.address);
          setAbout(response.data.about);
          setDate(response.data.date);
          setCountry(response.data.country);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div class="container rounded bg-white mt-5 mb-5">
      {updated && (
        <p
          style={{
            color: "green",
            border: "1px solid green",
            backgroundColor: "white",
          }}
        >
          Profile updated Succesfully
        </p>
      )}
      <div class="row">
        <div class="col-md-3 border-right">
          <div class="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              class="rounded-circle mt-5"
              width="150px"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            />
            <span class="font-weight-bold">{cookie.cookie.first_name}</span>
            <span class="text-black-50">{cookie.cookie.email}</span>
            <span> </span>
          </div>
        </div>
        <div class="col-md-5 border-right">
          <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-right">Your Public Profile</h4>
            </div>
            <div class="row mt-2">
              <div class="col-md-6">
                <label class="labels">Your Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="first name"
                  value={name}
                  onChange={(e) => {
                    changeHandlerGeneric(e.target.value, setName);
                  }}
                />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-12">
                <label class="labels">Email ID</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="enter email id"
                  value={email}
                  onChange={(e) => {
                    changeHandlerGeneric(e.target.value, setEmail);
                  }}
                />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-12">
                <label class="labels">Gender</label>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => {
                      changeHandlerGeneric(e.target.value, setGender);
                    }}
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Male
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => {
                      changeHandlerGeneric(e.target.value, setGender);
                    }}
                  />
                  <label class="form-check-label" for="flexRadioDefault2">
                    Female
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault3"
                    value="Rather Not say"
                    checked={gender === "Rather Not say"}
                    onChange={(e) => {
                      changeHandlerGeneric(e.target.value, setGender);
                    }}
                  />
                  <label class="form-check-label" for="flexRadioDefault3">
                    Rather Not say
                  </label>
                </div>
              </div>

              <div class="col-md-12">
                <label for="date">Date of Birth</label>
                <DatePicker
                  selected={date}
                  onChange={(date) => {
                    console.log(date);
                    setDate(date);
                  }}
                />
              </div>
              <div class="col-md-12">
                <label for="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  class="form-control"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  value={phone}
                  onChange={(e) => {
                    changeHandlerGeneric(e.target.value, setPhone);
                  }}
                />
              </div>
              <div class="col-md-12">
                <label for="FormControlTextarea1">Address</label>
                <textarea
                  class="form-control"
                  id="FormControlTextarea1"
                  rows="3"
                  value={address}
                  onChange={(e) => {
                    changeHandlerGeneric(e.target.value, setAddress);
                  }}
                  required
                ></textarea>
              </div>
              <div class="col-md-12">
                <label class="labels">City</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="City"
                  value={city}
                  onChange={(e) => {
                    changeHandlerGeneric(e.target.value, setCity);
                  }}
                />
              </div>
              <div class="col-md-12">
                <label for="FormControlTextarea2">About</label>
                <textarea
                  class="form-control"
                  id="FormControlTextarea2"
                  rows="3"
                  value={about}
                  onChange={(e) => {
                    changeHandlerGeneric(e.target.value, setAbout);
                  }}
                ></textarea>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-md-6">
                <label class="labels">Country</label>
                <Select
                  options={options}
                  value={country}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div class="mt-5 text-center">
              <button
                class="btn btn-primary profile-button"
                type="button"
                onClick={updateProfile}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserProfile;
