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

export const CREATE_CUSTOMER = gql`
mutation CreateCustomer($customerInput: CustomerInput) {
  createCustomer(customerInput: $customerInput) {
    _id
    name
    email
    phone
    shoeSize
  }
}
`;

export const CREATE_EVENT = gql`
mutation CreateEvent($eventInput: EventInput) {
  createEvent(eventInput: $eventInput) {
    _id
    eventLocation
    eventTime
    eventContact {
      email
      name
      phone
      shoeSize
    }
    eventTitle
    eventLeadEmployee {
      name
    }
    eventLoadinTime
    eventDisplay
    eventSignups {
      name
      email
      phone
      shoeSize
    }
    eventNotes
    eventPartyType
    eventVan
    eventTransferOrder
    eventHelpers
  }
}
`;

export const UPDATE_EVENT = gql`
mutation UpdateEvent($eventInput: EventInput) {
  updateEvent(eventInput: $eventInput) {
    _id
    eventLocation
    eventTime
    eventContact {
      email
      name
      phone
      shoeSize
    }
    eventTitle
    eventLeadEmployee {
      name
    }
    eventLoadinTime
    eventDisplay
    eventSignups {
      name
      email
      phone
      shoeSize
    }
    eventNotes
    eventPartyType
    eventVan
    eventTransferOrder
    eventHelpers
  }
}
`;

export const EVENT_ADD_SIGNUP = gql`
mutation EventAddSignup($_id: ID!, $customerInput: CustomerInput!) {
  eventAddSignup(_id: $_id, customerInput: $customerInput) {
    _id
    eventLocation
    eventTime
    eventContact {
      email
      name
      phone
      shoeSize
    }
    eventTitle
    eventLeadEmployee {
      name
    }
    eventLoadinTime
    eventDisplay
    eventSignups {
      name
      email
      phone
      shoeSize
    }
    eventNotes
    eventPartyType
    eventVan
    eventTransferOrder
    eventHelpers
  }
}
`;
