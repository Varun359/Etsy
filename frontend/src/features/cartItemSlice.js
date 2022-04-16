import { createSlice } from "@reduxjs/toolkit";

export const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState: {
    cartItems: [],
  },
  reducers: {
    // by id
    addAllCartItems: (state, action) => {
      state.cartItems = action.payload;
    },

    addItemToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (ele) => ele.item_id === action.payload.item_id
      );
      if (itemIndex === -1) state.cartItems.push(action.payload);
    },
    addCartItemQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (ele) => ele.item_id === action.payload.item_id
      );

      if (
        state.cartItems[itemIndex].item_quantity -
          state.cartItems[itemIndex].quantity >
        0
      )
        state.cartItems[itemIndex].quantity =
          state.cartItems[itemIndex].quantity + 1;
    },

    deleteCartItemQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (ele) => ele.item_id === action.payload.item_id
      );

      if (state.cartItems[itemIndex].quantity !== 1)
        state.cartItems[itemIndex].quantity =
          state.cartItems[itemIndex].quantity - 1;
    },

    // createCartItem: (state, action) => {
    //   const exist = state.cartItems.findIndex(
    //     (ele) => ele.item_id === action.payload.item_id
    //   );
    //   console.log(exist + "----------------------------: exist");
    //   if (exist !== -1) {
    //     state.cartItems[exist] = {
    //       ...state.cartItems[exist],
    //       ...action.payload,
    //     };
    //   } else {
    //     state.cartItems.push(action.payload);
    //   }
    // },
    // removeCartItem: (state, action) => {
    //   console.log("----------------------------: deleted" + action.payload);
    //   let index = state.cartItems.findIndex(
    //     ({ id }) => id === action.payload.item_id
    //   );
    //   state.cartItems.splice(index, 1);
    //   // state.cartItems.splice(action.payload, 1);
    //   // const item = state.cartItems.filter(
    //   //   (ele) => ele.itemId === action.payload
    //   // );
    //   //   state.cartProducts = null;
    //   // console.log(item + "----------------------------: deleted");
    // },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  createCartItem,
  removeCartItem,
  clearCart,
  addItemToCart,
  addAllCartItems,
  addCartItemQuantity,
  deleteCartItemQuantity,
} = cartItemsSlice.actions;

export const getCartItems = (state) => state.cartItem.cartItems;

export default cartItemsSlice.reducer;
