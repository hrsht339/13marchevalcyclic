const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    product:String,
    type:String
})

const productModel = mongoose.model("product",productSchema)

module.exports = {
    productModel
}