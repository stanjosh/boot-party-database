const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Event {
    eventTitle: String! 
    eventLeadEmployee: [Employee!]
    eventContact: Customer!
    eventLoadinTime: String!
    eventTime: String!
    eventDisplay: String
    eventSignups: [Customer!]
    eventLocation: String
    eventNotes: String!
    eventPartyType: String!
    eventVan: Number?
    eventTransferOrder: String!
    eventHelpers: [String]
  }

  input EventInput {
    eventTitle: String 
    eventLeadEmployee: [Employee]
    eventContact: Customer
    eventLoadinTime: String
    eventTime: String
    eventDisplay: String
    eventSignups: [Customer]
    eventLocation: String
    eventNotes: String
    eventTransferOrder: String
    eventHelpers: [String]
  }

  type Customer {
    firstName: String
    lastName: String
    email: String
    shoeSize: Number
  }

  input CustomerInput {
    firstName: String
    lastName: String
    email: String
    shoeSize: Number
  }

  type Employee {
    firstName: String
    lastName: String
    email: String
    phone: String
  }

  input EmployeeInput {
    firstName: String
    lastName: String
    email: String
    phone: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }



  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    searchAllProduct: [Product]
    searchProductUPC: [Product]
    searchProductName: [Product]
    searchUser(id: ID!): User
    searchUserByName(username: String!): User
  }

  type Mutation {

    loginUser(email: String!, password: String!): Auth
    saveUser(username: String!, email: String!, password: String!): Auth
    createNewProduct(productInput: ProductInput): User
    createNewInventory(inventoryName: String!): User
    removeInventory(inventoryId: ID!): User
    addInventoryToUser(inventoryId: ID!, userId: ID!): User
    removeInventoryFromUser(_id: ID!, inventoryId: ID!): User
    addProductToInventory(inventoryId: ID!, productInput: ProductInput!): Inventory
    addProductQuantity(inventoryId: ID!, productId: ID!): Inventory
    removeProductFromInventory(inventoryId: ID!, productId: ID!, quantity: Int): Inventory
    
  }
`;

module.exports = typeDefs;
