const { AuthenticationError } = require('apollo-server-express');
const {  } = require('../models');


const resolvers = {
  Query: {
    findEventByDate: async (parent, { date }, context) => {
      return await Inventory.find({ date: date })

    },
    findEventByEventTitle: async (parent, { eventTitle }, context) => {
      return await Inventory.find({ eventTitle: eventTitle })
    },

    findEventByEventLeadEmployee: async (parent, { eventLeadEmployee }, context) => {
      return await Inventory.find({ eventLeadEmployee: eventLeadEmployee })
    },

    findEventByEventContact: async (parent, { eventContact }, context) => {
      return await Inventory.find({ eventContact: eventContact })
    },

    findEventByEventLoadinTime: async (parent, { eventLoadinTime }, context) => {
      return await Inventory.find({ eventLoadinTime: eventLoadinTime })
    },
    
    findEventByEventTime: async (parent, { eventTime }, context) => {
      return await Inventory.find({ eventTime: eventTime })
    },

    findEventByEventLocation: async (parent, { eventLocation }, context) => {
      return await Inventory.find({ eventLocation: eventLocation })
    },
    
    findEventByEventLocation: async (parent, { eventLocation }, context) => {
      return await Inventory.find({ eventLocation: eventLocation })
    },

    findEventByEventTransferOrder: async (parent, { eventTransferOrder }, context) => {
      return await Inventory.find({ eventTransferOrder: eventTransferOrder })
    },

  },

  Mutation: {
    createEvent: async (parent, args, context) => {
      const event = await Inventory.create(args);
  
      return event;
    }
  }


};

module.exports = resolvers;


