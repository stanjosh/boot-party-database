const { AuthenticationError } = require('apollo-server-express');
const { Event, Customer } = require('../models');


const resolvers = {
  Query: {
    findCustomerByID: async (uuid) => {
      return await Customer.findOne(uuid);
    },
    findCustomerByEmail: async (parent, { email }, context) => {
      return await Customer.findOne({ email: email });
    },

    findEventByID: async (parent, { _id }, context) => {
      return await Event.findOne({ _id: _id });
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
    createCustomer: async (parent, { customerInput }, context) => {
      console.log( customerInput );
      const customer = await Customer.create( customerInput );
      console.log(customer);
      return customer;
    },

    createEvent: async (parent, { eventInput }, context) => {
      console.log( eventInput );
      const event = await Event.create( eventInput )
      
      console.log(event);
      return event.populate('eventContact');
    }
  }


};

module.exports = resolvers;


