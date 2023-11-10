const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Event {
    eventTitle: String! 
    eventLeadEmployee: [Employee!]
    eventContact: Customer!
    eventLoadinTime: String!
    eventTime: String!
    eventDisplay: String
    eventSignups: [Customer]
    eventLocation: String
    eventNotes: String!
    eventPartyType: String!
    eventVan: Int
    eventTransferOrder: String!
    eventHelpers: [String]
  }

  input EventInput {
    eventContact: [CustomerInput]
    eventTime: String!
    eventLocation: String!
  }

  type BootProduct {
    sku: String!
    name: String
    size: Int
    color: String
    quantity: Int
  }


  type Customer {
    firstName: String!
    lastName: String!
    email: String!
    phone: String
    shoeSize: Int
  }

  input CustomerInput {
    firstName: String
    lastName: String
    email: String
    shoeSize: Int
  }

  type Employee {
    name: String!
  }

  input EmployeeInput {
    name: String!

  }

  type Query {
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
    createCustomer(customerInput: CustomerInput): Customer
    createEmployee(employeeInput: EmployeeInput): Employee
    
  }

`;

module.exports = typeDefs;
