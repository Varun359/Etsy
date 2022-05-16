import { gql } from "@apollo/client";

export const GET_USER_DETAILS = gql`
  query getUserDetails($user_id: String) {
    getUserDetails(user_id: $user_id) {
      first_name
      email
      _id
      country
      about
      phone_no
      gender
      city
      address
      DOB
      shop_image
      shop_name
      user_image
    }
  }
`;

export const LOAD_ITEMS = gql`
  query {
    getAllItems {
      _id
      user
      item_name
      item_category
      item_price
      item_desc
      item_quantity
      item_image
    }
  }
`;

export const CHECK_SHOP_NAME = gql`
  query checkShopName($shop_name: String) {
    checkShopName(shop_name: $shop_name) {
      shop_name
    }
  }
`;

export const GET_SHOP_DETAILS = gql`
  query {
    getShopDetails {
      shop_name
      shop_image
      user_image
    }
  }
`;

export const GET_SHOP_DETAILSBYID = gql`
  query getShopDetailsById($user_id: String) {
    getShopDetailsById(user_id: $user_id) {
      shop_name
      shop_image
      user_image
    }
  }
`;

export const GET_CART_ITEMS = gql`
  query {
    getCartItems {
      item {
        _id
        item_name
        item_price
        item_desc
        item_quantity
        item_category
        item_image
      }
      user {
        _id
        shop_name
      }
      quantity
      gift
      give_gift
    }
  }
`;

export const GET_PREVIOUS_ORDERS = gql`
  query getPreviousOrders($user_id: String) {
    getPreviousOrders(user_id: $user_id) {
      item {
        _id
      }
      user {
        _id
      }
      order {
        date
      }
      quantity_buyed
      price_buyed
      item_name
      item_image
      shop_name
      gift
    }
  }
`;
