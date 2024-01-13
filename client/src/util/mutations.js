import { gql } from '@apollo/client';


export const CREATE_USER = gql`
mutation CreateUser($userInput: UserInput!) {
  createUser(userInput: $userInput) {
    user {
      _id
      email
      guestProfile {
        _id
        name
        phone
        shoeSize
        shoeWidth
        boots {
          bootName
          bootSku
          bootImgSrc
        }
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
      guestProfile {
        _id
        name
        phone
        shoeSize
        shoeWidth
        boots {
          bootName
          bootSku
          bootImgSrc
        }
      }
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
      guestProfile {
        _id
        name
        phone
        shoeSize
        shoeWidth
        boots {
          bootName
          bootSku
          bootImgSrc
        }
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
      shoeWidth
      shoeSize
      boots {
          bootName
          bootSku
          bootImgSrc
        }
    }
    eventTitle
    eventLeadEmployee
    eventLoadinTime
    eventDisplay
    eventSignups {
      name
      email
      phone
      shoeWidth
      shoeSize
      boots {
          bootName
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
      shoeWidth
      shoeSize
      boots {
          bootName
          bootSku
          bootImgSrc
        }
    }
    eventTitle
    eventLeadEmployee
    eventLoadinTime
    eventDisplay
    eventSignups {
      name
      email
      phone
      shoeWidth
      shoeSize
      boots {
          bootName
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
`;

export const EVENT_ADD_SIGNUP = gql`
mutation EventAddSignup($eventId: ID!, $guestId: ID!) {
  eventAddSignup(eventId: $eventId, guestId: $guestId) {
    _id
    eventLocation
    eventTime
    eventContact {
      email
      name
      phone
      shoeWidth
      shoeSize
      boots {
          bootName
          bootSku
          bootImgSrc
        }
    }
    eventTitle
    eventLeadEmployee
    eventLoadinTime
    eventDisplay
    eventSignups {
      name
      email
      phone
      shoeWidth
      shoeSize
      boots {
          bootName
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
`;

export const EVENT_REMOVE_SIGNUP = gql`
mutation EventRemoveSignup($eventId: ID!, $guestId: ID!) {
  eventRemoveSignup(eventId: $eventId, guestId: $guestId) {
    _id
    eventLocation
    eventTime
    eventContact {
      email
      name
      phone
      shoeWidth
      shoeSize
      boots {
          bootName
          bootSku
          bootImgSrc
        }
    }
    eventTitle
    eventLeadEmployee
    eventLoadinTime
    eventDisplay
    eventSignups {
      name
      email
      phone
      shoeWidth
      shoeSize
      boots {
          bootName
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
`;

export const UPDATE_GUEST = gql`
mutation updateGuest( $guestInput: GuestInput!) {
  updateGuest( guestInput: $guestInput) {
    _id
    name
    email
    phone
    shoeWidth
    shoeSize
    boots {
          bootName
          bootSku
          bootImgSrc
        }
  }
}
`;
