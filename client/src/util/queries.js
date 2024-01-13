import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query Me {
  me {
    _id
    email
    admin
    events {
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


    partner {
      _id
      name
      events {
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
    eventPartner {
      _id
      name
    }
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
    eventPartner {
      _id
      name
    }
  }
}
`;
