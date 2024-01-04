import { gql } from '@apollo/client';


export const CREATE_USER = gql`
mutation CreateUser($userInput: UserInput!) {
  createUser(userInput: $userInput) {
    user {
      _id
      email
      customerProfile {
        _id
        name
        phone
        shoeSize
        shoeWidth
        bootName
        bootSku
        bootImgSrc
      }
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
      email
      customerProfile {
        _id
        name
        phone
        shoeSize
        shoeWidth
        bootName
        bootSku
        bootImgSrc
      }
    }
    token
  }
}
`;

export const CREATE_CUSTOMER = gql`
mutation CreateCustomer($customerInput: CustomerInput) {
  createCustomer(customerInput: $customerInput) {
    user {
      _id
      email
      customerProfile {
        _id
        name
        phone
        shoeSize
        shoeWidth
        bootName
        bootSku
        bootImgSrc
      }
    }
  }
}
`;

export const CREATE_EVENT = gql`
mutation CreateEvent($eventInput: EventInput!, $userId: ID) {
  createEvent(eventInput: $eventInput, userId: $userId) {
    _id
    eventLocation
    eventTime
    eventContact {
      email
      name
      phone
      bootName
      bootSku
      shoeWidth
      shoeSize
      bootImgSrc
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
      shoeWidth
      shoeSize
      bootImgSrc
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
      shoeWidth
      shoeSize
      bootImgSrc
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
      shoeWidth
      shoeSize
      bootImgSrc
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
mutation EventAddSignup($eventId: ID!, $customerId: ID!) {
  eventAddSignup(eventId: $eventId, customerId: $customerId) {
    _id
    eventLocation
    eventTime
    eventContact {
      email
      name
      phone
      bootName
      bootSku
      shoeWidth
      shoeSize
      bootImgSrc
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
      shoeWidth
      shoeSize
      bootImgSrc
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
      shoeWidth
      shoeSize
      bootImgSrc
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
      shoeWidth
      shoeSize
      bootImgSrc
    }
    eventNotes
    eventPartyType
    eventVan
    eventTransferOrder
    eventHelpers
  }
}
`;

export const UPDATE_CUSTOMER = gql`
mutation updateCustomer( $customerInput: CustomerInput!) {
  updateCustomer( customerInput: $customerInput) {
    _id
    name
    email
    phone
    bootName
    bootSku
    shoeWidth
    shoeSize
    bootImgSrc
  }
}
`;
