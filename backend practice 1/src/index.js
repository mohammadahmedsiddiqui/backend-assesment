const express = require("express")
const {dbconnect} = require("./config/db")
const {User} = require("./models/usermodel")

const app = express()

// miidleware
app.use(express.json())




app.get("/" , ((req,res)=>{
res.send("hello world")
}))

app.use('/addUser', async (req, res) => {
    const data = req.body;
    try {
        const user = new User(data);
        await user.save();
        res.send({ message: 'User added successfully!', user });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            res.status(400).send('Error: Email already exists.');
        } else {
            res.status(500).send('Error adding user: ' + error);
        }
    }
});

app.use('/getUsers', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send('Error adding user')
    }
})



app.use('/updateUser/:id', async (req, res) => {
    const data = req.body
    const { id } = req.params
    try {
        const user = await User.findByIdAndUpdate(id, data, {
            returnDocument: 'after'
        })
          await user.save(); 
        res.send('User updated successfully !' + user)
    } catch (error) {
        res.status(500).send('Error updating user')
    }
})





dbconnect().then(()=>{
    console.log("db connected");
    app.listen(3000 , ()=>{
    console.log("listening on port 3000");
})
})
.catch((error)=>{
    console.log("db error");
    console.log(error);
})

