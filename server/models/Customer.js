const { Schema, model } = require('mongoose');



const customerSchema = new Schema({
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


    
});




const Customer = model('Customer', customerSchema);



module.exports = Customer;