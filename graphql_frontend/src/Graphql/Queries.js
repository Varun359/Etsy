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
