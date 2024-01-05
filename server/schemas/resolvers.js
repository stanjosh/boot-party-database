const { AuthenticationError } = require('apollo-server-express');
const { Event, Guest, User } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    findAllEvents: async (date) => {
  
      return await Event.find({
        eventTime: {
          $gt: new Date().setDate(date) || Date.now()
        }
      }).sort({ date: -1 })
  
      },

    
    

    findGuestByID: async (uuid) => {
      return await Guest.findOne(uuid);
    },
    findGuestByEmail: async (parent, { email }, context) => {
      return await Guest.findOne({ email: email });
    },

    findEventByID: async (parent, { uuid }, context) => {
      return await Event.findOne({ _id: uuid })
    },

    findEventByDate: async (parent, { date }, context) => {
      return await Event.find({ date: date })

    },
    findEventByEventTitle: async (parent, { eventTitle }, context) => {
      return await Event.find({ eventTitle: eventTitle })
    },

    findEventByEventLeadEmployee: async (parent, { eventLeadEmployee }, context) => {
      return await Event.find({ eventLeadEmployee: eventLeadEmployee })
    },

    findEventByEventContact: async (parent, { eventContact }, context) => {
      return await Event.find({ eventContact: eventContact })
    },

    findEventByEventLoadinTime: async (parent, { eventLoadinTime }, context) => {
      return await Event.find({ eventLoadinTime: eventLoadinTime })
    },
    
    findEventByEventTime: async (parent, { eventTime }, context) => {
      return await Event.find({ eventTime: eventTime })
    },

    findEventByEventLocation: async (parent, { eventLocation }, context) => {
      return await Event.find({ eventLocation: eventLocation })
    },

    findEventByEventLocation: async (parent, { eventLocation }, context) => {
      return await Event.find({ eventLocation: eventLocation })
    },

    findEventByEventTransferOrder: async (parent, { eventTransferOrder }, context) => {
      return await Event.find({ eventTransferOrder: eventTransferOrder })
    },



  },

  Mutation: {

    createUser: async (parent, { userInput }, context) => {
      const user = await User.create({
        ...userInput,
      });
      const token = signToken(user);
      return { token, user };
    },

    updateUser: async (parent, { userInput }, context) => {
      if (context.user && context.user._id === userInput._id) {

        const user = await User.findOneAndUpdate(
          userInput._id ? { _id: userInput._id } : null,
          { 
            ...userInput 
          },
          { 
            new: true, upsert: true
          }
        );
        return user;
      } else {
        throw new AuthenticationError('You need to be logged in!');
      }
    },

    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email: email })

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    createEvent: async (parent, { eventInput, userId }, context) => {
      const event = Event.create( eventInput )
      if (userId) {
        await User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { events: event._id } },
          { new: true }
        );
      }
      return event;
    },

    updateEvent: async (parent, { eventId, updateEventInput }, context) => {
      return await Event.findOneAndUpdate({ _id: eventId }, { ...updateEventInput}, { new: true });
    },

    eventAddSignup: async (parent, { eventId, guestId }, context) => {
      const event = await Event.findOneAndUpdate({ _id: eventId },
        {
          $push: {
            eventSignups: guestId
          },
                
        });
        return event
        ;
    },

    eventRemoveSignup: async (parent, { eventId, guestId }, context) => {
      const event = await Event.findOneAndUpdate({ _id: eventId },
        {
          $pull:{
            eventSignups: guestId
            }
          }
        );
        return event;
    },

    createGuest: async (parent, { guestInput }, context) => {
      console.log( guestInput );
      const guest = await Guest.create( guestInput );
      console.log(guest);
      return guest;
    },

    updateGuest: async (parent, { guestInput }, context) => {
      const guest = await Guest.findOneAndUpdate(
        guestInput._id ? { _id: guestInput._id } : null,
        { 
          ...guestInput
        },
        { 
          new: true, upsert: true
        });
      return guest;
    },


  }
};

module.exports = resolvers;


