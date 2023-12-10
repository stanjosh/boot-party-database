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
    eventLeadEmployee: String
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

    eventTitle: String 
    eventLeadEmployee: String
    eventLoadinTime: String
    eventDisplay: String
    eventNotes: String
    eventPartyType: String
    eventVan: Int
    eventTransferOrder: String
    eventHelpers: [String]
  }

  input UpdateEventInput {
    eventLocation: String
    eventTime: String
    eventContact: String
    eventTitle: String 
    eventLeadEmployee: String
    eventLoadinTime: String
    eventDisplay: String
    eventNotes: String
    eventPartyType: String
    eventVan: Int
    eventTransferOrder: String
    eventHelpers: [String]
  }

  type Customer {
    _id: ID!
    name: String!
    email: String!
    phone: String
    boot: String
  }

  input CustomerInput {
    name: String!
    email: String!
    phone: String
    boot: String
  }



  type Query {
    me(uuid: ID!): me
    findAllEvents(date: String): [Event]
    findCustomerByID(uuid: ID!): Customer
    findEventByID(uuid: ID!): Event
    findEventByDate(date: String!): [Event]
    findCustomerByFirstName(firstName: String!): [Customer]
    findCustomerByLastName(lastName: String!): [Customer]
    findCustomerByEmail(email: String!): [Customer]
    findCustomerByPhone(phone: String!): [Customer]
    findCustomerByShoeSize(shoeSize: Int!): [Customer]
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
    updateEvent(eventId: ID!, updateEventInput: UpdateEventInput  ): Event
    eventAddSignup(eventId: ID!, customerInput: CustomerInput!): Event
    createCustomer(customerInput: CustomerInput): Customer
    
  }

`;

module.exports = typeDefs;
