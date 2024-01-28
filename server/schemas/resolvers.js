const { AuthenticationError } = require('apollo-server-express');
const { Event, Guest, User, Partner } = require('../models');
const { signToken } = require('../utils/auth');
const { Types }  = require('mongoose');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
    },

    findAllEvents: async () => {
  
      return await Event.find({
        eventTime: { $gte: new Date(Date.now() - 7 * 24 * 3600 * 1000) }
      })
      .populate('eventSignups')
      .populate('eventContact')
      .sort({ 'eventTime' : 'desc' })
    },

    findAllUsers: async () => {

      return await User.find()

  
    },

    findAllPartners: async () => {

      return await Partner.find()
      
    },
    
    findPartnersBySearch: async (parent, { search }, context) => {
      return await Partner.find({ $text: { $search:  search } })
    },


    findUsersBySearch: async (parent, { search }, context) => {
      console.log( search )
      const guestProfile = await Guest.find({ $text: { $search: search } })
      if (guestProfile.length > 0) {
        return await User.find({ guestProfile: { $in: guestProfile } })
      } else {
        return await User.find({ $text: { $search: search } })
      }

      
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
      const user = await Guest.findOneAndUpdate(
        {email: userInput.email},
        { email: userInput.email,
          name: userInput.name},
        {new: true, upsert: true}
      )
      .then( guest => {
        return User.create({ 
          ...userInput, 
          guestProfile: guest._id
        })})
        .catch(err => {
          console.log(err);
      });

      const token = signToken(user);
      return { token, user };
    },

    updateUser: async (parent, { userId, userInput, guestId, guestInput }, context) => {
      console.log( context.user )
      if (context.user && (context.user.admin || context.user?._id === userId) ) {
        const guest = await Guest.findOneAndUpdate(
          { email: guestInput.email || userInput.email },
          { ...guestInput },
          { new: true, upsert: true }
        );

        const user = await User.findOneAndUpdate(
          userId ? { _id: userId } : null,
          { 
            ...userInput,
            guestProfile: guest._id
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
      const error = {};
      if (!user) {
        error.message = 'No user with this email found!';
        throw new AuthenticationError('No user with this email found!');
        
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        error.message = 'Incorrect password!';
        throw new AuthenticationError('Incorrect password!');
        
      }

      const token = signToken(user);
      return { token, user, error };
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

    createPartner: async (parent, { partnerInput }, context) => {
      const partner = await Partner.create( partnerInput );
      return partner;
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

    updateGuest: async (parent, { guestInput, guestId }, context) => {
      const guest = await Guest.findOneAndUpdate(
        { _id: guestId || new Types.ObjectId() },
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


