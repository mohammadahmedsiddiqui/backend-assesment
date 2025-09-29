const jwt = require("jsonwebtoken")
const {user} = require("../modal/user")
const { json } = require("express")


const userauth = async(req , res , next)=>{


    try {
        const token = req.cookies
if(!token){
throw new Error ({message:"token is invalid"})
}

const id = jwt.verify(token,process.env.secertkey)

const User = user.find({_id:id})
    if(!User){
            throw new Error('User not found !')
        }

      req.User = User
next()

    } catch (error) {
          res.status(400).send("ERROR: " + error.message);
    }

}

module.exports = {
    userauth
}

