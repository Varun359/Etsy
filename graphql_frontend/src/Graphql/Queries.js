import { gql } from "@apollo/client";

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
