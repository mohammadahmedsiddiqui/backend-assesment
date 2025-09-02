const express = require("express")
const products = require("./product")

const app = express()



// all products
app.get('/',(req,res)=>{
    res.json(products)
})

// find a singlr product
app.get('/product/:id', (req,res)=>{
    const findproduct = products.find((p)=>{
        p.id===parseInt(res.params.id)
       
    })
     if(!findproduct){res.status(201).json({})
    
    res.json(findproduct)
}
)



app.listen(3000)

