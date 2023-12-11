const { Schema, model } = require('mongoose');



const customerSchema = new Schema({
    shoeSize: {
        type: Number,
        required: false,
        trim: true
    },
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
    shoeSize: {
        type: Number,
        required: false,
        trim: true
    },
    shoeWidth: {
        type: String,
        required: false,
        trim: true
    },
    phone : {
        type: String,
        required: false,
        trim: true
    },
    name: {
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




const Customer = model('Customer', customerSchema);



module.exports = Customer;