const { Schema, model } = require('mongoose');


const eventSchema = new Schema({
    time: {
        type: Date,
        required: true,
    },
    
    location: {
        type: String,
        required: true,
        trim: true
    },

    contact: {
        name: {
            type: String,
            required: true,
            trim: true
        },
        phone : {
            type: String,
            required: false,
            trim: true
        },
        email : {
            type: String,
            required: false,
            trim: true
        }
    },

    title: {
        type: String,
        required: false,
        trim: true
    },

    lead: {
        type: String,
        trim: true
    },

    loadTime: {
        type: String,
        required: false,
        trim: true
    },
    
    display: {
        type: String,
        trim: true
    },
    
    
    guests: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        phone : {
            type: String,
            required: false,
            trim: true
        },
        email : {
            type: String,
            required: false,
            trim: true
        },
        boots: [ {
                bootSku: {
                    type: String,
                    required: false,
                    trim: true
                },
                bootName: {
                    type: String,
                    required: false,
                    trim: true
                },
                bootImgSrc: {
                    type: String,
                    required: false,
                    trim: true
                },
                width: {
                    type: String,
                    required: false,
                    trim: true
                },
                size: {
                    type: Number,
                    required: false,
                    trim: true
                }
            } ],
                
    }],

    notes: {
        type: String,
        trim: true
    },
    
    van: {
        type: Number
    },
    transferOrder: {
        type: String,
        trim: true
    },
    helpers: {
        type: [String],
        trim: true
    },
    options: {
        type: [String],
        trim: true
    },
    partner : {
        type: Schema.Types.ObjectId,
        ref: 'Partner',
        autopopulate: true,
    }

    
});


eventSchema.virtual('bootsList').get(function () {
    return this.eventSignups.map(guest => guest.boots).flat()
});

eventSchema.plugin(require('mongoose-autopopulate'));


const Event = model('Event', eventSchema);



module.exports = Event;