const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true, minlength: 5},
    phoneNumber: { type: String },
    address: { type: String },
    LGA: { type: String },
    state: { type: String },
    adminId: { type: String },
})

module.exports = User = mongoose.model("user", userSchema);