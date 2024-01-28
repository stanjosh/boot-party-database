import { gql } from '@apollo/client';

const boots = `{ bootName
  bootSku
  bootImgSrc
  width
  size
}`

const guest = `{
  _id
  name
  email
  phone
  boots ${boots}
}`

const partner = `{
  _id
  name
  imgSrc
}`

const contact = `{
  name
  email
  phone
}`

const event = `{
  _id
  location
  time
  contact ${contact}
  partner ${partner}
  title
  lead
  loadTime
  display
  guests ${guest}
  notes
  van
  transferOrder
  helpers
}`

const user = `{
  _id
  email
  admin
  partner ${partner}
  events ${event}
}`

export const UPDATE_USER = gql`
mutation UpdateUser($userInput: UserInput!) {
  updateUser(userInput: $userInput) {
    user ${user}
    token
  }
}
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user ${user}
      token
  }
}
`;

export const CREATE_PARTNER = gql`
mutation CreatePartner($partnerInput: PartnerInput!) {
  createPartner(partnerInput: $partnerInput) 
    ${partner}
}
`;


export const CREATE_EVENT = gql`
mutation CreateEvent($eventInput: EventInput!, $userId: ID) {
  createEvent(eventInput: $eventInput, userId: $userId) 
    ${event}
}
`;

export const UPDATE_EVENT = gql`
mutation UpdateEvent($updateEventInput: UpdateEventInput!, $eventId: ID) {
  updateEvent(updateEventInput: $updateEventInput, eventId: $eventId)
    ${event}
}
`;
export const EVENT_REMOVE_GUEST = gql`
mutation EventRemoveGuest($eventId: ID!, $guestInput: GuestInput!) {
  eventRemoveGuest(eventId: $eventId, guestInput: $guestInput)
    ${event}
}
`;

export const EVENT_ADD_GUEST = gql`
mutation EventAddGuest($eventId: ID!, $guestInput: GuestInput!) {
  eventAddGuest(eventId: $eventId, guestInput: $guestInput)
    ${event}
}
`;




