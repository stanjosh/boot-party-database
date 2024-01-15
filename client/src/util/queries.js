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
        boots { bootName
                bootSku
                bootImgSrc
        }
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
        boots { bootName
                bootSku
                bootImgSrc
        }
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
          boots { bootName
                bootSku
                bootImgSrc
        }
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
          boots { bootName
                bootSku
                bootImgSrc
        }
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
      boots { bootName
                bootSku
                bootImgSrc
        }
    }
  }
}
`;

export const QUERY_USERS = gql`
query FindAllUsers {
  findAllUsers {
    _id
    email
    admin
    partner {
      _id
      name
    }
    guestProfile {
      _id
      name
      email
      phone
      shoeSize
      shoeWidth
      boots { bootName
                bootSku
                bootImgSrc
        }
    }
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
        boots { bootName
                bootSku
                bootImgSrc
        }
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
        boots { bootName
                bootSku
                bootImgSrc
        }
      }
      eventNotes
      eventPartyType
      eventVan
      eventTransferOrder
      eventHelpers
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
      boots { bootName
                bootSku
                bootImgSrc
        }
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
      boots { bootName
                bootSku
                bootImgSrc
        }
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
      boots { bootName
                bootSku
                bootImgSrc
        }
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
      boots { bootName
                bootSku
                bootImgSrc
        }
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

export const QUERY_PARTNERS = gql`
query FindAllPartners {
  findAllPartners {
    _id
    name
    events {
      _id
      eventLocation
      eventTime
    }
    users {
      _id
      email
      admin
    }
  }
}
`;


export const QUERY_PARTNERS_SEARCH = gql`
query FindPartnersBySearch($search: String!) {
  findPartnersBySearch(search: $search) {
    _id
    name
    imgSrc
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
        boots { bootName
                bootSku
                bootImgSrc
        }
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
        boots { bootName
                bootSku
                bootImgSrc
        }
      }
      eventNotes
      eventPartyType
      eventVan
      eventTransferOrder
      eventHelpers
    }
    users {
      _id
      email
      admin
      guestProfile {
        _id
        name
        email
        phone
        shoeSize
        shoeWidth
        boots { bootName
                bootSku
                bootImgSrc
        }
      }
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
          boots { bootName
                bootSku
                bootImgSrc
        }
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
          boots { bootName
                bootSku
                bootImgSrc
        }
        }
        eventNotes
        eventPartyType
        eventVan
        eventTransferOrder
        eventHelpers
      }
    }
  }
}
`;


export const QUERY_USERS_SEARCH = gql`
query FindUsersBySearch($search: String!) {
  findUsersBySearch(search: $search) {
    _id
    email
    admin
    partner {
      _id
      name
    }
    guestProfile {
      _id
      name
      email
      phone
      shoeSize
      shoeWidth
      boots { bootName
                bootSku
                bootImgSrc
        }
    }
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
        boots { bootName
                bootSku
                bootImgSrc
        }
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
        boots { bootName
                bootSku
                bootImgSrc
        }
      }
      eventNotes
      eventPartyType
      eventVan
      eventTransferOrder
      eventHelpers
    }
  }
}
`;