const mongoose = require("mongoose")


mongoose.connect('mongodb://127.0.0.1:27017/contactapp')
.then(()=>{
console.log("database connected");
})
.catch(()=>{
    console.log("connection error");
})

const conatctschema = new mongoose.Schema({
    firstname:{
        type:String
    },
      lastname:{
        type:String
    },
     emailaddress:{
        type:String
    },
      contactnumber:{
        type:String
    },
      address:{
        type:String
    },
})


module.exports = mongoose.model("contact" , conatctschema)
