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





export const QUERY_ME = gql`
query Me {
  me {
    _id
    email
    admin
    name
    phone
    partner ${partner}
    events ${event}
  }
}
`;

export const QUERY_USERS = gql`
query FindAllUsers {
  findAllUsers {
    _id
    email
    admin
    name
    phone
    partner ${partner}
    events ${event}
  }
}
`;


export const QUERY_EVENT = gql`
query FindEventByID($uuid: ID!) {
  findEventByID(uuid: $uuid) 
    ${event}
}
`;

export const QUERY_EVENTS = gql`
query FindAllEvents {
  findAllEvents 
    ${event}
}
`;

export const QUERY_PARTNERS = gql`
query FindAllPartners {
  findAllPartners {
    _id
    name
    events ${event}
    users ${user}
  }
}
`;


export const QUERY_PARTNERS_SEARCH = gql`
query FindPartnersBySearch($search: String!) {
  findPartnersBySearch(search: $search) {
    _id
    name
    imgSrc
    events ${event}
    users ${user}
  }
}
`;


export const QUERY_USERS_SEARCH = gql`
query FindUsersBySearch($search: String!) {
  findUsersBySearch(search: $search) {
    _id
    email
    name
    phone
    admin
    partner ${partner}
    events ${event}
  }
}
`;