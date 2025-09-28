const mongoose = require("mongoose")

const productmodel = new mongoose.Schema({},{})

const product = mongoose.model("product" , productmodel )

module.exports = {product}