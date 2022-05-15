import { createSlice } from "@reduxjs/toolkit";

export const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    favorites: [],
  },
  reducers: {
    getAllItems: (state, action) => {
      state.items = action.payload;
    },
    favoritesList: (state, action) => {
      state.favorites = action.payload;
    },
    addFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorites: (state, action) => {
      const itemIndex = state.favorites.findIndex(
        (ele) => ele.item_id === action.payload.item_id
      );

      state.cartItems.splice(itemIndex, 1);
    },
    removeFavoritesList: (state) => {
      state.favorites = null;
    },
  },
});

export const {
  //   productsList,
  //   removeProductsState,
  //   updateProducts,
  getAllItems,
  favoritesList,
  addFavorites,
  removeFavoritesList,
  removeFavorites,
  //removeAllItemsFromHome,
} = itemsSlice.actions;

export const getProducts = (state) => state.item.products;
export const getAllProducts = (state) => state.item.items;
export const getAllFavourites = (state) => state.item.favourites;

export default itemsSlice.reducer;
