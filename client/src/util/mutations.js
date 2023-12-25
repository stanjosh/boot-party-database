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
    bootName
    bootSku
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
      bootName
      bootSku
    }
    eventTitle
    eventLeadEmployee
    eventLoadinTime
    eventDisplay
    eventSignups {
      name
      email
      phone
      bootName
      bootSku
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
mutation UpdateEvent($eventId: ID!, $updateEventInput: UpdateEventInput) {
  updateEvent(eventId: $eventId, updateEventInput: $updateEventInput) {
    _id
    eventLocation
    eventTime
    eventContact {
      email
      name
      phone
      bootName
      bootSku
    }
    eventTitle
    eventLeadEmployee
    eventLoadinTime
    eventDisplay
    eventSignups {
      name
      email
      phone
      bootName
      bootSku
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
mutation EventAddSignup($eventId: ID!, $customerInput: CustomerInput!) {
  eventAddSignup(eventId: $eventId, customerInput: $customerInput) {
    _id
    eventLocation
    eventTime
    eventContact {
      email
      name
      phone
      bootName
      bootSku
    }
    eventTitle
    eventLeadEmployee
    eventLoadinTime
    eventDisplay
    eventSignups {
      name
      email
      phone
      bootName
      bootSku
    }
    eventNotes
    eventPartyType
    eventVan
    eventTransferOrder
    eventHelpers
  }
}
`;

export const EVENT_REMOVE_SIGNUP = gql`
mutation EventRemoveSignup($eventId: ID!, $customerId: ID!) {
  eventRemoveSignup(eventId: $eventId, customerId: $customerId) {
    _id
    eventLocation
    eventTime
    eventContact {
      email
      name
      phone
      bootName
      bootSku
    }
    eventTitle
    eventLeadEmployee
    eventLoadinTime
    eventDisplay
    eventSignups {
      name
      email
      phone
      bootName
      bootSku
    }
    eventNotes
    eventPartyType
    eventVan
    eventTransferOrder
    eventHelpers
  }
}
`;

export const EDIT_CUSTOMER = gql`
mutation editCustomer($customerId: ID!, $customerInput: CustomerInput!) {
  editCustomer(customerId: $customerId, customerInput: $customerInput) {
    _id
    name
    email
    phone
    bootName
    bootSku
  }
}
`;
