import { gql } from "@apollo/client";

// export const CREATE_USER_MUTATION = gql`
//   mutation register($username: String!, $email: String!, $password: String!) {
//     register(username: $username, email: $email, password: $password) {
//       username
//       email
//     }
//   }
// `;

export const UPDATE_USER_PROFILE = gql`
  mutation userProfile($first_name: String , $email: String , $gender: String , $city: String , $phone_no:String , $country:String ,$DOB:String ,$about:String ,$address: String ) {
    userProfile(first_name : $first_name, email : $email, gender: $gender, city:$city, phone_no:$phone_no, country : $country, DOB : $DOB, about:$about, address : $address  )) {
      first_name
      country
      gender
    }
  }
`;
