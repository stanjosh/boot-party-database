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

export const QUERY_INVENTORY = gql`
query Inventory($inventoryId: ID!) {
  inventory(inventoryId: $inventoryId) {
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
    inventoryName
    _id
  }
}
`;

export const QUERY_ALL_PRODUCT = gql`
query searchAllProduct {
  searchAllProduct {
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
`;

export const QUERY_PRODUCT_UPC = gql`
query ProductUPC($UPC: String!) {
  searchProductUPC(UPC: $UPC) {
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
`;

export const QUERY_PRODUCT_NAME = gql`
query ProductName($name: String!) {
  searchProductName(name: $name) {
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
`;

