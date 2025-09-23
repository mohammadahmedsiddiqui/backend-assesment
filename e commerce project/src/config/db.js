
const mongoose = require("mongoose")
require("dotenv").config()

const url = process.env.url

const connectdb = async function () {
  await  mongoose.connect(url)
}

module.exports = {connectdb}