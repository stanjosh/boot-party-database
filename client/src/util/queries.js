import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query Me {
  me {
    _id
    username
    email
    password
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
}
`;
