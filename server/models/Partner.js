const { Schema, model } = require('mongoose');



const partnerSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    imgSrc: {
        type: String,
        required: false,
        trim: true
    },
    events : [{
        type: Schema.Types.ObjectId,
        ref: 'Event',
        autopopulate: true,
    }],
    users : [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true,
    }]


    
});

partnerSchema.index({ name: 'text' });

partnerSchema.plugin(require('mongoose-autopopulate'));



const Partner = model('Partner',partnerSchema);



module.exports = Partner;