const { Schema, model } = require('mongoose');


const eventSchema = new Schema({
    eventContact: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Guest',
        autopopulate: true,

    },

    eventTitle: {
        type: String,
        required: false,
        trim: true
    },

    eventLeadEmployee: {
        type: String,
        trim: true
    },

    eventLoadinTime: {
        type: String,
        required: false,
        trim: true
    },
    
    eventTime: {
        type: Date,
        required: true,
    },
    eventDisplay: {
        type: String,
        trim: true
    },
    eventSignups: {
        type: [Schema.Types.ObjectId],
        ref: 'Guest',
        autopopulate: true,
        
    },
    eventLocation: {
        type: String,
        required: true,
        trim: true
    },
    eventNotes: {
        type: String,
        trim: true
    },
    eventPartyType: {
        type: String,
        trim: true
    },
    eventVan: {
        type: Number
    },
    eventTransferOrder: {
        type: String,
        trim: true
    },
    eventHelpers: {
        type: [String],
        trim: true
    },
    eventPartner : {
        type: Schema.Types.ObjectId,
        ref: 'Partner',
        autopopulate: true,
    }
    
});

eventSchema.plugin(require('mongoose-autopopulate'));


const Event = model('Event', eventSchema);



module.exports = Event;