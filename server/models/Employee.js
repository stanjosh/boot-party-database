const { Schema, model } = require('mongoose');



const customerSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
});




const Employee = model('Event', employeeSchema);



module.exports = Employee;