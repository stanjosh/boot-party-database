const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    password: String!
    guestProfile: Guest
    partner: Partner
    admin: Boolean
    events: [Event]
  }

  input UserInput {
    email: String!
    password: String!
    name: String
  }
  
  type Partner {
    _id: ID!
    name: String!
    events: [Event]
    users: [User]
  }

  type Event {
    _id: ID!
    eventLocation: String!
    eventTime: String!
    eventContact: Guest!
    eventTitle: String 
    eventLeadEmployee: String
    eventLoadinTime: String
    eventDisplay: String
    eventSignups: [Guest]
    eventNotes: String
    eventPartyType: String
    eventVan: Int
    eventTransferOrder: String
    eventHelpers: [String]
    eventPartner: Partner
  }

  input EventInput {
    eventLocation: String!
    eventTime: String!
    eventContact: String!
    eventNotes: String
    eventTitle: String 
    evventPartner: String
  }

  input UpdateEventInput {
    eventLocation: String
    eventTime: String
    eventTitle: String 
    eventLeadEmployee: String
    eventLoadinTime: String
    eventDisplay: String
    eventNotes: String
    eventPartyType: String
    eventVan: Int
    eventTransferOrder: String
    eventHelpers: [String]
    eventContact: GuestInput
    eventPartner: String
  }

  type Guest {
    _id: ID!
    name: String!
    email: String
    phone: String
    shoeSize: String
    shoeWidth: String
    boots: [Boot]
  }

  type Boot {
    bootImgSrc: String!
    bootSku: String!
    bootName: String!
    width: String
    size: String
  }


  input GuestInput {
    name: String
    email: String
    phone: String
    boots: [BootInput]
    shoeSize: String
    shoeWidth: String
    bootImgSrc: String
  }

  

  input BootInput {
    bootImgSrc: String
    bootSku: String
    bootName: String
    width: String
    size: String
  }

  type Auth {
    token: ID!
    user: User
  }


  type Query {
    me: User
    findAllEvents: [Event]
    findAllUsers: [User]
    findUsersBySearch(search: String!): [User]
    findGuestByID(uuid: ID!): Guest
    findEventByID(uuid: ID!): Event
    findEventByDate(date: String!): [Event]
    findGuestByFirstName(firstName: String!): [Guest]
    findGuestByLastName(lastName: String!): [Guest]
    findGuestByEmail(email: String!): [Guest]
    findGuestByPhone(phone: String!): [Guest]
    findGuestByShoeSize(shoeSize: Int!): [Guest]
    findEventByEventTitle(eventTitle: String!): [Event]
    findEventByEventLeadEmployee(eventLeadEmployee: String!): [Event]
    findEventByEventContact(eventContact: String!): [Event]
    findEventByEventLoadinTime(eventLoadinTime: String!): [Event]
    findEventByEventTime(eventTime: String!): [Event]
    findEventByEventLocation(eventLocation: String!): [Event]
    findEventByEventTransferOrder(eventTransferOrder: String!): [Event]
    


  }

  type Mutation {
    createUser(userInput: UserInput!): Auth
    loginUser(email: String!, password: String!): Auth
    updateUser(userId: ID!, userInput: UserInput!): User
    createEvent(eventInput: EventInput!, userId: ID): Event
    updateEvent(eventId: ID!, updateEventInput: UpdateEventInput!): Event
    eventAddSignup(eventId: ID!, guestId: ID!): Event
    eventRemoveSignup(eventId: ID!, guestId: ID!): Event
    updateGuest(guestInput: GuestInput!): Guest
    createGuest(guestInput: GuestInput!): Guest

  }

`;

module.exports = typeDefs;
