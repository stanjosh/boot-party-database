const { AuthenticationError } = require('apollo-server-express');
const { Event } = require('../models');


const resolvers = {
  Query: {
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
    createEvent: async (parent, { eventInput }, context) => {
      console.log( eventInput );
      const event = await Event.create( eventInput );
      console.log(event);
      return event;
    }
  }


};

module.exports = resolvers;


