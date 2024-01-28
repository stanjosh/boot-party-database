import { gql } from '@apollo/client';

const boots = `boots {
  bootName
  bootSku
  bootImgSrc
  width
  size
}`

const guest = `{
  _id
  name
  phone
  shoeSize
  shoeWidth
  ${boots}
}`

const event = `{
  _id
  eventLocation
  eventTime
  eventContact ${guest}
  eventTitle
  eventLeadEmployee
  eventLoadinTime
  eventDisplay
  eventSignups ${guest}
  eventNotes
  eventPartyType
  eventVan
  eventTransferOrder
  eventHelpers
}`

export const CREATE_USER = gql`
mutation CreateUser($userInput: UserInput!) {
  createUser(userInput: $userInput) {
    user {
      _id
      email
      guestProfile ${guest}
    }
    token
  }
}
`;

export const UPDATE_USER = gql`
mutation UpdateUser($userId: ID!, $userInput: UserInput!, $guestInput: GuestInput) {
  updateUser(userId: $userId, userInput: $userInput, guestInput: $guestInput) {
    _id
    email
    admin
    partner {
      _id
      name
      imgSrc
    }
    guestProfile ${guest}
  }
}
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
    user {
      _id
      email
      admin
      partner {
        _id
        name
        imgSrc
      }
      guestProfile ${guest}
    }
    token
  }
}
`;

export const CREATE_GUEST = gql`
mutation CreateGuest($guestInput: GuestInput) {
  createGuest(guestInput: $guestInput) {
    user {
      _id
      email
      guestProfile ${guest}
    }
  }
}
`;

export const CREATE_PARTNER = gql`
mutation CreatePartner($partnerInput: PartnerInput!) {
  createPartner(partnerInput: $partnerInput) {
    _id
    name
    imgSrc
  }
}
`;


export const CREATE_EVENT = gql`
mutation CreateEvent($eventInput: EventInput!, $userId: ID) {
  createEvent(eventInput: $eventInput, userId: $userId) 
    ${event}
}
`;

export const UPDATE_EVENT = gql`
mutation UpdateEvent($eventId: ID!, $updateEventInput: UpdateEventInput) {
  updateEvent(eventId: $eventId, updateEventInput: $updateEventInput)
    ${event}
}
`;

export const EVENT_ADD_SIGNUP = gql`
mutation EventAddSignup($eventId: ID!, $guestId: ID!) {
  eventAddSignup(eventId: $eventId, guestId: $guestId)
    ${event}
}
`;

export const EVENT_REMOVE_SIGNUP = gql`
mutation EventRemoveSignup($eventId: ID!, $guestId: ID!) {
  eventRemoveSignup(eventId: $eventId, guestId: $guestId)
    ${event}
}
`;

export const UPDATE_GUEST = gql`
mutation updateGuest( $guestInput: GuestInput!, $guestId: ID) {
  updateGuest( guestInput: $guestInput, guestId: $guestId)
    ${guest}
}
`;

