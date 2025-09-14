const mongoose = require("mongoose")

const uri = "mongodb+srv://admin:admin123@cluster0.xvkeaih.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const dbconnect = async function () {
    await mongoose.connect(uri)
}

module.exports = {dbconnect}