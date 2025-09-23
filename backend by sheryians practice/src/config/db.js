const mongoose = require("mongoose")


const dbconnect = async ()=> {
  await  mongoose.connect(process.env.mongourl)
}


module.exports={dbconnect}