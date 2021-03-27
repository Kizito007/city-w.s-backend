const mongoose = require("mongoose");

const ringlightSchema = mongoose.Schema({
    descrp: { type: String },
    //iphone brand
    brand: { type: String },
    price: { type: Number },
    qty: { type: Number },
    img: { type: String },
    // tag or new
    tag: { type: String },
    sale: { type: Boolean },
    //whether sold out or on sale
    arrival: { type: String },
    //Add reviews field
    ratings: { type: String },
})

module.exports = Ringlight = mongoose.model("ringlight", ringlightSchema);