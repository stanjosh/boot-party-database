const { Schema, model } = require('mongoose');



const guestSchema = new Schema({
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
    shoeWidth: {
        type: String,
        required: false,
        trim: true
    },
    shoeSize: {
        type: Number,
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
        } ],
            
});




const Guest = model('Guest', guestSchema);



module.exports = Guest;