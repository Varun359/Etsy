import React, { useState, useEffect, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import countryList from "react-select-country-list";
import { useCookies, CookiesProvider } from "react-cookie";
import { Edit, CameraAlt } from "@material-ui/icons";
import "./css/editProfile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL, KAFKA_BASE_URL } from "../variables";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateUserDetails } from "../features/userSlice";
import { s3 } from "./configure";
import { useQuery, useMutation, gql } from "@apollo/client";
import { UPDATE_USER_PROFILE } from "../Graphql/Mutation";
import { GET_USER_DETAILS } from "../Graphql/Queries";
const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Rather Not say");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [about, setAbout] = useState("");
  const [imageSrc, setImageSrc] = useState(
    "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
  );
  const [date, setDate] = useState(new Date());
  const [country, setCountry] = useState("United States");
  const options = useMemo(() => countryList().getData(), []);
  const [cookie, setCookie] = useCookies(["cookie"]);
  const [updated, setUpdated] = useState(false);
  const selectOptions = [];
  const user_local = JSON.parse(localStorage.getItem("user"));
  const userId = user_local.user_id;
  const [editProfile] = useMutation(UPDATE_USER_PROFILE, {
    onCompleted(res) {
      console.log(res);
    },
    onError(e) {
      console.log(e.message);
    },
  });

  options.map((option) => {
    selectOptions.push(<option value={option.label}>{option.label}</option>);
  });
  const changeHandlerGeneric = (value, setterFunc) => {
    console.log(value);
    setterFunc(value);
  };
  const { error, loading, data } = useQuery(GET_USER_DETAILS, {
    variables: { user_id: userId },
  });
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
    console.log("Data", data);
    // axios
    //   .post(`${BASE_URL}/updateUserProfile`, data, {
    //     headers: {
    //       "content-Type": "application/json",
    //       "auth-token": cookie.cookie.token,
    //     },
    //   })

    editProfile({
      variables: {
        user_id: userId,
        name: data.name,
        gender: data.gender,
        city: data.city,
        phone_no: data.phone,
        address: data.address,
        country: data.country,
        email: data.email,
        date: data.date,
        about: data.about,
      },
    })
      .then((response) => {
        console.log("Status Code : ", response);
        if (response) {
          // axios
          //   .get(`${BASE_URL}/profile`, {
          //     headers: {
          //       "auth-token": cookie.cookie.token,
          //     },
          //   })
          console.log("The data is response", data);
          // console.log("Status Code : ", response.status);
          // if (response.status === 200) {
          //   console.log("In Editprofile", response);
          let date2 = new Date(data.date).toUTCString();
          dispatch(
            updateUserDetails({
              first_name: data.first_name,
              dob: date2,
              gender: data.gender,
              city: data.city,
              user_image: data.user_image,
              about: data.about,
              phone_no: data.phone_no,
              adddress: data.address,
            })
          );
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/favorite");
          setUpdated(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem("user"));
    console.log(
      "====================================== user id ======================================"
    );
    console.log(userProfile);
    console.log(userProfile.user_id);
    if (data !== undefined) console.log("User Details", data);
    axios.defaults.withCredentials = true;
    axios
      .get(`${BASE_URL}/profile`, {
        headers: {
          "auth-token": cookie.cookie.token,
        },
      })
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log("Edit profile", response);
          setName(response.data.first_name);
          setGender(response.data.gender);
          setCity(response.data.city);
          setEmail(response.data.email);
          setPhone(response.data.phone_no);
          setAddress(response.data.address);
          setAbout(response.data.about);
          let date1;
          if (response.data.date) {
            date1 = new Date(response.data.date).toUTCString();
            setDate(date1);
          }
          setCountry(response.data.country);
          if (response.data.user_image !== null) {
            setImageSrc(response.data.user_image);
          }
          dispatch(
            updateUserDetails({
              first_name: response.data.first_name,
              dob: date1,
              gender: response.data.gender,
              city: response.data.city,
              user_image: response.data.user_image,
              about: response.data.about,
              phone_no: response.data.phone_no,
              adddress: response.data.address,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setName(cookie.cookie.first_name);
    setEmail(cookie.cookie.email);
  }, [data]);
  const changeImage = async (data) => {
    console.log("The data", data.name);
    const formData = new FormData();
    formData.append("UserImage", data);

    console.log("This is in edit User Image");

    // changed here
    const imageName = `users/${Date.now()}_${data.name}`;
    console.log(imageName);
    const params = {
      Bucket: "etsyimages",
      Key: imageName,
      Expires: 60,
      ContentType: "image/*",
    };
    const uploadUrl = await s3.getSignedUrlPromise("putObject", params);
    console.log(uploadUrl);
    await fetch(
      new Request(uploadUrl, {
        method: "PUT",
        body: data,
        headers: new Headers({
          "Content-Type": "image/*",
        }),
      })
    );

    const imageUrl = uploadUrl.split("?")[0];

    const imageData = {
      imageUrl,
    };
    axios
      .post(`${BASE_URL}/uploadUserImage/` + cookie.cookie.user_id, imageData, {
        headers: {
          "content-Type": "application/json",
          "auth-token": cookie.cookie.token,
        },
      })
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response);
          setUpdated(true);
          setImageSrc(response.data.user_image);
          const user = JSON.parse(localStorage.getItem("user"));
          user["user_image"] = response.data.imageName;
          console.log("User setttt", user);
          localStorage.setItem("user", JSON.stringify(user));
        }
      })
      .catch((err) => {
        console.log(err);
      });
    //till here

    // axios
    //   .post(
    //     `${BASE_URL}/updateProfileImage/` + cookie.cookie.user_id,
    //     formData,
    //     {
    //       headers: {
    //         "content-Type": "multipart/form-data",
    //         "auth-token": cookie.cookie.token,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log("Status Code : ", response.status);
    //     if (response.status === 200) {
    //       console.log(response);
    //       setUpdated(true);
    //       setImageSrc(`${BASE_URL}/images/${response.data.imageName}`);
    //       const user = JSON.parse(localStorage.getItem("user"));
    //       user["user_image"] = response.data.imageName;
    //       console.log("User setttt", user);
    //       localStorage.setItem("user", JSON.stringify(user));
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
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
          <div className=" editProfile__img_banner d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              class="rounded-circle mt-5"
              width="150px"
              alt="profile pic"
              src={imageSrc}
            />
            <label class="editProfile__shop_icon">
              <input
                onChange={(event) => {
                  console.log("eventtttt", event.target.files);
                  changeImage(event.target.files[0]);
                }}
                type="file"
              />

              <CameraAlt />
              {/* Custom Upload */}
            </label>
            <span class="font-weight-bold">{name}</span>
            <span class="text-black-50">{email}</span>
            <span> </span>
          </div>
        </div>
        <div class="col-md-5 border-right">
          <form
            class="p-3 py-5"
            onSubmit={(e) => {
              e.preventDefault();
              updateProfile();
            }}
          >
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
                  pattern="[0-9]{3}-[0-9]{4}-[0-9]{3}"
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
              <div class="col-md-12">
                <label class="labels">Country</label>
                <select
                  className="form-select custom-select"
                  value={country}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setCountry(e.target.value);
                  }}
                >
                  {selectOptions}
                </select>
              </div>
            </div>
            <div class="mt-5 text-center">
              <button class="btn btn-primary profile-button" type="submit">
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
