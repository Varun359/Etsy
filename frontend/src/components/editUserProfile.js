import React, { useState, useEffect, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import countryList from "react-select-country-list";
import { Select } from "antd";
const EditUserProfile = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [country, setCountry] = useState("United States");
  const options = useMemo(() => countryList().getData(), []);
  // const DatePick = () => {
  //   const [startDate, setStartDate] = useState(new Date());
  //   return (
  //     <DatePicker
  //       selected={startDate}
  //       onChange={(date: Date) => setStartDate(date)}
  //     />
  //   );
  // };
  const changeHandler = (value) => {
    setCountry(value);
  };

  // useEffect(() => {
  //   const selectDrop = document.querySelector("#countries");
  //   // const selectDrop = document.getElementById('countries');

  //   fetch("http://restcountries.eu/rest/v2/all")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       let output = "";
  //       data.forEach((country) => {
  //         output += `

  //     <option value="${country.name}">${country.name}</option>`;
  //       });

  //       selectDrop.innerHTML = output;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  return (
    <div class="container rounded bg-white mt-5 mb-5">
      <div class="row">
        <div class="col-md-3 border-right">
          <div class="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              class="rounded-circle mt-5"
              width="150px"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            />
            <span class="font-weight-bold">Varun</span>
            <span class="text-black-50">varunreddy@mail.com</span>
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
                  value=""
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
                  value=""
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
                    checked
                  />
                  <label class="form-check-label" for="flexRadioDefault3">
                    Rather Not say
                  </label>
                </div>
              </div>

              <div class="col-md-12">
                <label for="date">Date of Birth</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
                {/* <div class="input-group date" id="datepicker">
                  <input type="text" class="form-control" id="date" />
                  <span class="input-group-append">
                    <span class="input-group-text bg-light d-block">
                      <i class="fa fa-calendar"></i>
                    </span>
                  </span>
                </div> */}
              </div>

              <div class="col-md-12">
                <label for="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  class="form-control"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                />
              </div>

              <div class="col-md-12">
                <label for="FormControlTextarea1">Address</label>
                <textarea
                  class="form-control"
                  id="FormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>

              <div class="col-md-12">
                <label class="labels">City</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="City"
                  value=""
                />
              </div>

              <div class="col-md-12">
                <label for="FormControlTextarea2">About</label>
                <textarea
                  class="form-control"
                  id="FormControlTextarea2"
                  rows="3"
                ></textarea>
              </div>

              <div class="col-md-12">
                <label class="labels">Area</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="enter address line 2"
                  value=""
                />
              </div>

              <div class="col-md-12">
                <label class="labels">Education</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="education"
                  value=""
                />
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
              <div class="col-md-6">
                <label class="labels">State/Region</label>
                <input
                  type="text"
                  class="form-control"
                  value=""
                  placeholder="state"
                />
              </div>
            </div>
            <div class="mt-5 text-center">
              <button class="btn btn-primary profile-button" type="button">
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
