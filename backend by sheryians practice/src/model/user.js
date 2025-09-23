const mongoose = require("mongoose")
const { trim, isLowercase } = require("validator")
const validator = require("validator")

const userschema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        minlength:5,
        maxlength:20,
        trim:true,
        lowercase:true 
    },
    lastname:{
        type:String,
        required:true,
        minlength:5,
        maxlength:20,
        trim:true,
       lowercase:true
    },
   email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:20,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
if(!validator.isEmail(value)){
throw new Error("please enter correct email")
}
        }
       
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:20,
        trim:true,
        validate(value){
if(!validator.isStrongPassword(value)){
throw new Error("lol credentials")

}
        }

    },
    age:{
        type:Number,
        required:true,
        min:5,
        max:20,
        trim:true,

    },
    contactnumber:{
        type:String,
        required:true,
        minlength:5,
        maxlength:20,
        trim:true,
        unique:true
    },

    gender:{
  type:String,
validate(value){
    if(!["male","female","others"].includes(value)){
throw new Error("enter a proper value")
}
    }
    },
    

},
 {
        collection: 'usersssss',
        timestamps: true
    })



const usermodal = mongoose.model("user" , userschema )
module.exports={usermodal}