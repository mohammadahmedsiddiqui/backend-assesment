const express = require("express")
const app =  express()
const {ageres } = require("./middleware/age")
app.use(express.json())



app.use('/userage',  ageres , (req,res)=>{
res.send("welcome to zone")
})


app.listen(3000 ,()=>{
  console.log("server is listen on port 3000")
})




// app.use((req , res , next)=>{
// console.log("middlewear")
// next()
// })

// app.get('/app',(req , res)=>{
//     console.log("1st route")
//     res.send("message after middlewera")
// })






// app.use syyrequest bnana

// app.use('/api',(req , res)=>{
//     if(req.method==="GET"){
//         res.send("this is a get request")
//     }

//       if(req.method==="POST"){
//         res.send("this is a POST request")
//     }

//       if(req.method==="PUT"){
//         res.send("this is a PUT request")
//     }

//       if(req.method==="DELETE"){
//         res.send("this is a DELETE request")
//     }
// })



// middleware
// app.use('/user' ,
    
//     (req , res , next)=>{
// console.log("1st middleware")
// next()
// res.send("1st middleware")
// },
//  (req , res , next)=>{
// console.log("2nd middleware")
// next()
// res.send("2nd middleware")
// }




// )


// app.get("/" , (req , res)=>{
// res.send("hello word")
// })





// admin example middlewear
// app.use('/admin'  ,  (req , res , next)=>{
// const token = 123;
// const authentictoken = token ===123
// if(!authentictoken){
// res.status(402).json({'message':" unauthentic token"})
// }
// else{
//     res.send("next is missing")
// }
// })

// app.use('/admin/getalldata',(req,res)=>{
// console.log("getalldata")
// res.send("get all data")
// })

// app.use('/admin/updatealldata',(req,res)=>{
// console.log("getalldata")
// res.send("get all data")
// })

// app.use('/admin/deletealldata',(req,res)=>{
// console.log("getalldata")
// res.send("get all data")
// })

// app.use('/admin/alldata',(req,res)=>{
// console.log("getalldata")
// res.send("get all data")
// })



