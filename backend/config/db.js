const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', false);

const Connection = mongoose.connect(process.env.DATABASE_URL)

module.exports = { Connection };