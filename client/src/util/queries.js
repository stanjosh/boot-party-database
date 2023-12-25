import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query Me {
  me {
    _id
    username
    email
    password
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
query FindAllEvents($date: String) {
  findAllEvents(date: $date) {
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
    }
    eventNotes
    eventPartyType
    eventVan
    eventTransferOrder
    eventHelpers
  }
}
`;
