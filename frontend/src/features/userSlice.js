import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    register: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    updateUserDetails: (state, action) => {
      state.user.first_name = action.payload.first_name;
      state.user.DOB = action.payload.DOB;
      state.user.gender = action.payload.gender;
      state.user.city = action.payload.city;
      state.user.user_image = action.payload.user_image;
      state.user.about = action.payload.about;
      state.user.phone_no = action.payload.phone_no;
      state.user.address = action.payload.address;
    },
    updateUserShop: (state, action) => {
      state.user.shopName = action.payload.shopName;
    },
    activeShop: (state, action) => {
      state.shop = action.payload.shopName;
    },
  },
});

export const {
  login,
  logout,
  register,
  updateUserDetails,
  updateUserShop,
  activeShop,
} = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
