const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type me {
    _id: ID!
    username: String!
    email: String!
    password: String!
   
  }

  type Event {
    _id: ID!
    eventLocation: String!
    eventTime: String!
    eventContact: Customer!

    eventTitle: String 
    eventLeadEmployee: [Employee!]
    eventLoadinTime: String
    eventDisplay: String
    eventSignups: [Customer]
    eventNotes: String
    eventPartyType: String
    eventVan: Int
    eventTransferOrder: String
    eventHelpers: [String]
  }

  input EventInput {
    eventLocation: String!
    eventTime: String!
    eventContact: String!

  }

  type BootProduct {
    sku: String!
    name: String
    size: Int
    color: String
    quantity: Int
  }


  type Customer {
    _id: ID!
    name: String!
    email: String!
    phone: String
    shoeSize: Int
    boot: String
  }

  input CustomerInput {
    name: String!
    email: String!
    phone: String
    shoeSize: Int
    boot: String
  }



  type Query {
    me(uuid: ID!): me
    findCustomerByID(uuid: ID!): Customer
    findEventByID(uuid: ID!): Event
    findEventByDate(date: String!): [Event]
    findCustomerByFirstName(firstName: String!): [Customer]
    findCustomerByLastName(lastName: String!): [Customer]
    findCustomerByEmail(email: String!): [Customer]
    findCustomerByPhone(phone: String!): [Customer]
    findCustomerByShoeSize(shoeSize: Int!): [Customer]
    findEmployeeByName(name: String!): [Employee]
    findEventByEventTitle(eventTitle: String!): [Event]
    findEventByEventLeadEmployee(eventLeadEmployee: String!): [Event]
    findEventByEventContact(eventContact: String!): [Event]
    findEventByEventLoadinTime(eventLoadinTime: String!): [Event]
    findEventByEventTime(eventTime: String!): [Event]
    findEventByEventLocation(eventLocation: String!): [Event]
    findEventByEventTransferOrder(eventTransferOrder: String!): [Event]


  }

  type Mutation {
    createEvent(eventInput: EventInput): Event
    editEvent(_id: ID!, eventInfo: EventInput): Event
    eventAddSignup(_id: ID!, customerInput: CustomerInput!): Event
    createCustomer(customerInput: CustomerInput): Customer
    createEmployee(employeeInput: EmployeeInput): Employee
    
  }

`;

module.exports = typeDefs;
