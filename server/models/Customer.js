const { Schema, model } = require('mongoose');



const customerSchema = new Schema({
    shoeSize: {
        type: String,
        required: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    
});




const Customer = model('Event', customerSchema);



module.exports = Customer;