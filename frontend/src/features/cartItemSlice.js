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

    sendGift: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (ele) => ele.item_id === action.payload.item_id
      );
      state.cartItems[itemIndex].give_gift =
        !state.cartItems[itemIndex].give_gift;
    },

    giftDescription: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (ele) => ele.item_id === action.payload.item_id
      );
      state.cartItems[itemIndex].gift = action.payload.gift;
    },
    deleteCartItem: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (ele) => ele.item_id === action.payload.item_id
      );

      state.cartItems.splice(itemIndex, 1);
    },

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
  deleteCartItem,
  sendGift,
  giftDescription,
} = cartItemsSlice.actions;

export const getCartItems = (state) => state.cartItem.cartItems;

export default cartItemsSlice.reducer;
