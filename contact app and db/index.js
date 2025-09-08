const express = require("express")
const app = express()
const contact =  require("./model/contact")
// middleware

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('view engine' , 'ejs')




// routes

app.get('/', async(req,res)=>{ 
    const getallcontact = await contact.find()
    res.render('home' , {contact:getallcontact})
})

app.get('/showcontact/:id', async(req,res)=>{
       const getonecontact = await contact.findOne({_id:req.params.id})
    res.render('showcontact',{contact:getonecontact})
})

app.get('/addcontact',(req,res)=>{res.render('addcontact')})

app.post('/addcontact', async(req,res)=>{
    await contact.create(req.body)
   res.redirect("/")
})

app.get('/updatecontact/:id', async(req,res)=>{
       const getonecontact = await contact.findOne({_id:req.params.id})
    res.render('updatecontact',{contact:getonecontact})
})

app.post('/updatecontact/:id',async (req,res)=>{
await contact.findByIdAndUpdate(req.params.id , req.body)
res.redirect('/')
})

app.get('/deletecontact/:id', async(req,res)=>{
await contact.findByIdAndDelete(req.params.id)
res.redirect("/")
})



app.listen(3000,()=>{
    console.log("port listening on port 3000");
})