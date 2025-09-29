const cookieParser = require("cookie-parser");
const express = require("express");
const validator = require("validator");
const app = express();
const { connectdb } = require("./src/config/db");
const { user} = require("./src/modal/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const {userauth} = require("./src/middleware/user")

require("dotenv").config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/',(req,res)=>{
// res.send("adssssssssss")
// })

// api user signup
app.use("/signup", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    if (!firstname || !lastname) {
      res.status(400).json({
        message: "name is missing",
        success: "false",
      });
    } else if (!validator.isEmail(email)) {
      res.status(400).json({
        message: "email is missing",
        success: "false",
      });
    } else if (!validator.isStrongPassword(password)) {
      res.status(400).json({
        message: "password is missing",
        success: "false",
      });
    }
    const hashedpassword = await bcrypt.hash(password, 10);

    const newuser = await user({
      firstname,
      lastname,
      email,
      password: hashedpassword,
    });

       const token = await jwt.sign({ id: user._id }, 'process.env.secertkey', { expiresIn: '1d'})

        res.cookie("token", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // expires in 1 day
        })
    await newuser.save();
    res.send({
      message: "User signup successfully!",
      data: user,
    });
  } catch (error) {
    if (email.code === 11000) {
      res.status(400).json({
        message: "email already exist",
        success: "false",
      });
    }
    console.log(error);
  }
});

// login 
app.use('/login', async(req,res)=>{
  const {email , password} = req.body
  
  if(!email || !password){
   res.status(400).send("please enter credentials")
  }

  const User = await user.findOne({email})

  if(!User){
       res.status(400).send("poor credentials")
}

const isvalidpassword = bcrypt.compare(password , User.password)
    if(isvalidpassword){
        const token = await jwt.sign({id: user._id}, 'process.env.secertkey', {expiresIn: '1d'})

        console.log("TOKEN--->", token);
        

        res.cookie("token", token)

        res.send("Login Successful !")
        }else{
            throw new Error('Invalid Credentials!')
        }


    }


)

app.use('/profile' ,userauth , async(req,res,)=>{
    try {
    
        
        const user = req.user

        res.send(user)

    } catch (error) {
           res.status(400).send({
            message: 'Profile error !',
            error: error.message
        })
    }

})





connectdb()
  .then(() => {
    console.log("database connected");
    app.listen(3000, () => {
      console.log("app listening on port 3000");
    });
  })
  .catch((error) => {
    console.log("database is not connected", error.meaaasge);
  });
