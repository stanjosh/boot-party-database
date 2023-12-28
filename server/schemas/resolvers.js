const { AuthenticationError } = require('apollo-server-express');
const { Event, Customer } = require('../models');
const { Mongoose } = require('mongoose');



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


    

    findCustomerByID: async (uuid) => {
      return await Customer.findOne(uuid);
    },
    findCustomerByEmail: async (parent, { email }, context) => {
      return await Customer.findOne({ email: email });
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
    createCustomer: async (parent, { customerInput }, context) => {
      console.log( customerInput );
      const customer = await Customer.create( customerInput );
      console.log(customer);
      return customer;
    },

    createEvent: async (parent, { eventInput }, context) => {
      return await Event.create( eventInput )
    },


    updateEvent: async (parent, { eventId, updateEventInput }, context) => {
      return await Event.findOneAndUpdate({ _id: eventId }, { ...updateEventInput}, { new: true });
    },

    eventAddSignup: async (parent, { eventId, customerId }, context) => {
      const event = await Event.findOneAndUpdate({ _id: eventId },
        {
          $push: {
            eventSignups: customerId
          },
                
        });
        return event
        ;
    },

    eventRemoveSignup: async (parent, { eventId, customerId }, context) => {
      const event = await Event.findOneAndUpdate({ _id: eventId },
        {
          $pull:{
            eventSignups: customerId
            }
          }
        );
        return event;
    },

    editCustomer: async (parent, { customerInput }, context) => {
      const customer = await Customer.findOneAndUpdate(
        customerInput._id ? { _id: customerInput._id } : null,
        { 
          ...customerInput 
        },
        { 
          new: true, upsert: true
        });
      return customer;
    }
  }
};

module.exports = resolvers;


