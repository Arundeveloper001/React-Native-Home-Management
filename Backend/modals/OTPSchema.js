const mongoose = require('mongoose')

const OTP = new mongoose.Schema({
    toMail: String,
    OTP: Number,
    created_time: Date,
}) 

module.exports = mongoose.model("OTP", OTP)