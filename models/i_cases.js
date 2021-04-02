const mongoose = require("mongoose");

const i_caseSchema = mongoose.Schema({
    descrp: { type: String },
    //iphone brand
    brand: { type: String },
    price: { type: Number },
    qty: { type: Number },
    img: { type: String },
    tag: { type: String },
    sale: { type: Boolean },
    //whether sold out or on sale
    arrival: { type: String },
    //Add reviews field
    ratings: { type: String },
    color: { type: String },
})

module.exports = I_Case = mongoose.model("i_case", i_caseSchema);