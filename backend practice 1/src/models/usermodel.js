const mongoose = require("mongoose")

const usermodel = new mongoose.Schema({
firstname:{
    type:String,
    required:true,
    minlength:5,
    maxlength:20,
    trim:true
},
email:{
    type:String,
    required:true,
    minlength:5,
    maxlength:50,
    trim:true,
    unique:true,
    lowercase:true
},
password:{
    type:String,
    required:true,
    minlength:5,
    maxlength:50,
    trim:true
}
},
 {
        collection: 'users',
        timestamps: true
    })


const User = mongoose.model("user",usermodel)

module.exports = {
    User
};