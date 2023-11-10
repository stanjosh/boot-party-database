const { Schema, model } = require('mongoose');



const eventSchema = new Schema({
    eventTitle: {
        type: String,
        required: true,
        trim: true
    },
    eventLeadEmployee: {
        type: [Schema.Types.ObjectId],
        ref: 'Employee'
    },
    eventContact: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    eventLoadinTime: {
        type: String,
        required: true,
        trim: true
    },
    eventTime: {
        type: String,
        required: true,
        trim: true
    },
    eventDisplay: {
        type: String,
        trim: true
    },
    eventSignups: {
        type: [Schema.Types.ObjectId],
        ref: 'Customer'
    },
    eventLocation: {
        type: String,
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
    }
});




const Event = model('Event', eventSchema);



module.exports = Event;