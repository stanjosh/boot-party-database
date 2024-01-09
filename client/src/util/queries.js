import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query Me {
  me {
    _id
    email
    password
    guestProfile {
      _id
      name
      email
      phone
      shoeSize
      shoeWidth
      bootName
      bootSku
      bootImgSrc
    }
  }
}
`;

export const QUERY_EVENT = gql`
query FindEventByID($uuid: ID!) {
  findEventByID(uuid: $uuid) {
    _id
    eventLocation
    eventTime
    eventContact {
      _id
      name
      email
      phone
      shoeSize
      shoeWidth
      bootName
      bootSku
      bootImgSrc
    }
    eventTitle
    eventLeadEmployee
    eventLoadinTime
    eventDisplay
    eventSignups {
      _id
      name
      email
      phone
      shoeSize
      shoeWidth
      bootName
      bootSku
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

export const QUERY_EVENTS = gql`
query FindAllEvents {
  findAllEvents {
    _id
    eventLocation
    eventTime
    eventContact {
      _id
      name
      email
      phone
      shoeSize
      shoeWidth
      bootName
      bootSku
      bootImgSrc
    }
    eventTitle
    eventLeadEmployee
    eventLoadinTime
    eventDisplay
    eventSignups {
      _id
      name
      email
      phone
      shoeSize
      shoeWidth
      bootName
      bootSku
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
