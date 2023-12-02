import { gql } from '@apollo/client';


export const SAVE_USER = gql`
mutation SaveUser($username: String!, $email: String!, $password: String!) {
  saveUser(username: $username, email: $email, password: $password) {
    user {
      inventories {
        products {
          _id
          UPC
          brand
          price
          description
          name
          image
          link
          category
          
        }
        priceTotal
        inventoryName
        _id
      }
      email
      _id
      username
    }
    token
  }
}
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
    user {
      _id
      username
      email
      inventories {
        _id
        inventoryName
        priceTotal
        products {
          _id
          UPC
          brand
          price
          description
          name
          image
          link
          category
          
        }
      }
    }
    token
  }
}
`;
