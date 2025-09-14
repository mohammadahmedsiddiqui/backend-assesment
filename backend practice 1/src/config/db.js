const mongoose = require("mongoose")
require('dotenv').config();


const uri = process.env.dburl

const dbconnect = async function () {
    await mongoose.connect(uri)
}

module.exports = {dbconnect}