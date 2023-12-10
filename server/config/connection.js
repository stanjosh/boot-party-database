require('dotenv').config();
const mongoose = require('mongoose');

const mongoDB = process.env.MONGODB_URI || 'mongodb://localhost:27017/apollo-server';
mongoose.connect( mongoDB, { useNewUrlParser: true, useUnifiedTopology: true } );


module.exports = mongoose.connection;
