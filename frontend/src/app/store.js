import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/userSlice";
import cartItemsReducer from "../features/cartItemSlice";
import itemsReducer from "../features/itemsSlice";
// const reducer = combineReducers({
//   user: userReducer,
//   cartItem: cartItemsReducer,
// });

export default configureStore({
  reducer: {
    user: userReducer,
    cartItem: cartItemsReducer,
    item: itemsReducer,
  },
});
