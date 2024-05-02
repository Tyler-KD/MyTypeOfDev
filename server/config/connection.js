const mongoose = require('mongoose');
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/devhub');

module.exports = mongoose.connection;