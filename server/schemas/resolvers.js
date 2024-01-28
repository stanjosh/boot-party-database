const { AuthenticationError } = require('apollo-server-express');
const { Event, User, Partner } = require('../models');
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
        time: { $gte: new Date(Date.now() - 7 * 24 * 3600 * 1000) }
      })
      .populate('guests')
      .populate('contact')
      .sort({ 'time' : 'desc' })
    },

    findAllUsers: async () => {

      return await User.find()

  
    },

    findUsersBySearch: async (parent, { search }, context) => {
      return await User.find({ $text: { $search:  search } })
    },

    findEventByID: async (parent, { uuid }, context) => {
      console.log(uuid)
      const event = await Event.findById(uuid)
        .populate('partner')
      console.log(event)
      return event;
    },

    findAllPartners: async () => {

      return await Partner.find()
      
    },
    
    findPartnersBySearch: async (parent, { search }, context) => {
      return await Partner.find({ $text: { $search:  search } })
    },

  },

  Mutation: {

    updateUser: async (parent, { userInput }, context) => {
      let user = {};
      if (userInput._id) {
        if (context.user && context.user._id === userInput._id) {
          user = await User.findOneAndUpdate({ _id: context.user._id }, { ...userInput }, { new: true });
        } else if ( context.admin && userInput._id ) {
          user = await User.findOneAndUpdate({ _id: userInput._id }, { ...userInput }, { new: true });
        } else {
          throw new AuthenticationError('You are not authorized to update this user');
        }

      } else {
        user = await User.create({ ...userInput });
      }
      const token = signToken(user);
      return { token, user };
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

    updateEvent: async (parent, { updateEventInput, eventId }, context) => {
      return await Event.findOneAndUpdate(
        {_id: eventId || new Types.ObjectId()},
        { ...updateEventInput},
        { upsert: true, new: true });
    },

    eventAddGuest: async (parent, { eventId, guestInput }, context) => {
      const event = await Event.findOneAndUpdate({ _id: eventId },
        {
          $push: {
            guests: guestInput
          },
                
        });
        return event
        ;
    },

    eventRemoveGuest: async (parent, { eventId, guestInput }, context) => {
      const event = await Event.findOneAndUpdate({ _id: eventId },
        {
          $pull:{
            guests: guestInput
            }
          }
        );
        return event;
    },


  }

};

module.exports = resolvers;


