import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/userSlice";
import cartItemsReducer from "../features/cartItemSlice";

// const reducer = combineReducers({
//   user: userReducer,
//   cartItem: cartItemsReducer,
// });

export default configureStore({
  reducer: {
    user: userReducer,
    cartItem: cartItemsReducer,
  },
});
