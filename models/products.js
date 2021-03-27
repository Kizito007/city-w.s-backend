const mongoose = require("mongoose")

let productSchema = mongoose.Schema ({
    ringlights: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ringlight'
        }
    ],
    i_cases: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'I_Case'
        }
    ],
})

module.exports = Product = mongoose.model("product", productSchema);