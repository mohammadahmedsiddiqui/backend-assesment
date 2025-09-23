const express = require("express")
const{ dbconnect} = require("./src/config/db")
const{ usermodal } = require("./src/model/user")

require("dotenv").config()

const app = express()

// global miiddleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// app.use("/" ,(req,res)=>{
// res.send("hello world")
// })


app.use('/allusers', async(req,res)=>{


try {
      const usersdata = await usermodal.find({})
    res.send(usersdata)
} catch (error) {
    res.status(400).json({message:"failed to fetch data"})
}

  
})



app.use("/adduser",async (req,res)=>{
const data= req.body
    try {
   const user = new usermodal(data)
   
   await user.save()
   console.log(user);
 res.status(201).json({
  message: "User added successfully",
  user: user.toObject()
})


} catch (error) {
    if(error.code===11000 && error.keyPattern && error.keyPattern.email){
res.status(400).json("EMAIL ALREADY EXIST")
    }else{
res.status(500).json("erroe"+error)

    }
   
}
})


app.use('/updateuser/:id', async(req,res)=>{
const data = req.body
const {id} = req.params
try {
    const user = await usermodal.findByIdAndUpdate(id,data,{
        runValidators:true
    })
    res.send("user updated successfully",user)
    if(!user){res.status(400).json({message:"user is not found"})}

} catch (error) {
    res.status(500).json({message:"error yo update user"})
}
})



dbconnect().then(()=>{
    console.log("db connected");
    app.listen(process.env.port,()=>{
        console.log("server running successfully");
    })
})
.catch((error)=>{
console.log("error in database connection",error);
})