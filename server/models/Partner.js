const { Schema, model } = require('mongoose');



const partnerSchema = new Schema({
    name: {
        type: String,
        required: true,
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




const Partner = model('Partner',partnerSchema);



module.exports = Partner;