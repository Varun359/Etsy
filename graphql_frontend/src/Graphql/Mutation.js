import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation register($first_name: String, $email: String, $password: String) {
    register(first_name: $first_name, email: $email, password: $password) {
      first_name
      email
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation editProfile(
    $user_id: String
    $first_name: String
    $email: String
    $gender: String
    $city: String
    $phone_no: String
    $country: String
    $DOB: String
    $about: String
    $address: String
  ) {
    editProfile(
      user_id: $user_id
      first_name: $first_name
      email: $email
      gender: $gender
      city: $city
      phone_no: $phone_no
      country: $country
      DOB: $DOB
      about: $about
      address: $address
    ) {
      first_name
      email
      country
      city
      phone_no
      DOB
      about
      address
      gender
    }
  }
`;

export const ADD_ITEMS_TO_CART = gql`
  mutation editProfile($user_id: String, $item_id: String, $quantity: Int) {
    editProfile(user_id: $user_id, item_id: $item_id, quantity: $quantity) {
      item {
        item_name
        item_image
        item_price
      }
      quantity
    }
  }
`;

export const DELETE_ITEMS_FROM_CART = gql`
  mutation deleteCartItems {
    deleteCartItems {
      quantity
    }
  }
`;

export const CREATE_SHOP = gql`
  mutation createShop($user_id: String, $shop_name: String!) {
    createShop(user_id: $user_id, shop_name: $shop_name) {
      shop_name
    }
  }
`;

export const INSERT_INTO_SHOP = gql`
  mutation insertIntoShop(
    $user_id: String
    $item_name: String
    $item_price: String
    $item_category: String
    $item_desc: String
    $item_quantity: Int
    $item_image: String
  ) {
    insertIntoShop(
      user_id: $user_id
      item_name: $item_name
      item_price: $item_price
      item_category: $item_category
      item_desc: $item_desc
      item_quantity: $item_quantity
      item_image: $item_image
    ) {
      item_name
      item_price
      item_quantity
      item_desc
      item_quantity
      item_image
    }
  }
`;

export const EDIT_SHOP_ITEM = gql`
  mutation editShopItem(
    $item_id: String
    $item_name: String
    $item_price: String
    $item_category: String
    $item_desc: String
    $item_quantity: Int
    $item_image: String
  ) {
    editShopItem(
      item_id: $item_id
      item_name: $item_name
      item_price: $item_price
      item_category: $item_category
      item_desc: $item_desc
      item_quantity: $item_quantity
      item_image: $item_image
    ) {
      item_name
      item_price
      item_quantity
      item_desc
      item_quantity
      item_image
    }
  }
`;
