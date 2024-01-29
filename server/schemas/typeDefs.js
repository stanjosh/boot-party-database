const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    name: String!
    phone: String
    partner: Partner
    admin: Boolean
    events: [Event]
  }

  type Partner {
    _id: ID!
    name: String!
    imgSrc: String
    events: [Event]
    users: [User]
  }

  type Event {
    _id: ID!
    location: String!
    time: String!
    contact: Contact
    title: String 
    lead: String
    loadTime: String
    display: String
    guests: [Guest]
    notes: String
    van: Int
    transferOrder: String
    helpers: [String]
    partner: Partner
  }

  type Contact {
    name: String!
    email: String
    phone: String
  }


  type Guest {
    _id: ID!
    name: String!
    email: String
    phone: String
    boots: [Boot]
  }

  type Boot {
    bootImgSrc: String!
    bootSku: String!
    bootName: String!
    width: String
    size: String
  }

  input EventInput {
    location: String!
    time: String!
    contact: ContactInput!
    notes: String
    title: String 
    partner: String
  }

  input UserInput {
    email: String!
    password: String!
    name: String!
    phone: String
    admin: Boolean
    partner: ID
  }

  input UpdateUserInput {
    _id: ID
    email: String
    name: String
    phone: String
    admin: Boolean
    partner: ID
  }

  input ContactInput {
    name: String!
    email: String!
    phone: String
  }

  input UpdateEventInput {
    location: String
    time: String
    contact: ContactInput
    title: String 
    lead: String
    loadTime: String
    display: String
    notes: String
    van: Int
    transferOrder: String
    helpers: [String]
    partner: String
  }

  input GuestInput {
    name: String
    email: String
    phone: String
    boots: [BootInput]
  }

  input PartnerInput {
    name: String!
    imgSrc: String
    events: [EventInput]

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
    findAllPartners: [Partner]
    findPartnersBySearch(search: String!): [Partner]
    findUsersBySearch(search: String!): [User]
    findGuestByID(uuid: ID!): Guest
    findEventByID(uuid: ID!): Event

  }

  type Mutation {
    createPartner(partnerInput: PartnerInput!): Partner
    createUser(userInput: UserInput!): Auth
    loginUser(email: String!, password: String!): Auth
    updateUser(userId: ID!, updateUserInput: UpdateUserInput!): User
    createEvent(eventInput: EventInput!, userId: ID): Event
    updateEvent(updateEventInput: UpdateEventInput!, eventId: ID): Event
    eventAddGuest(eventId: ID!, guestInput: GuestInput!): Event
    eventRemoveGuest(eventId: ID!, guestId: ID!): Event
    updateGuest(guestInput: GuestInput!, guestId: ID): Guest
    createGuest(guestInput: GuestInput!): Guest
   

  }

`;

module.exports = typeDefs;
