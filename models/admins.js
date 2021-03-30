const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 5 },
    fullname: { type: String },
    userId: { type: String },
    verifyAdmin: { type: String },
    role: {
        type: String,
        default: "admin",
    },
})

module.exports = Admin = mongoose.model("admin", adminSchema);