const ageres= (req , res , next)=>{
const age = 81
if(age<18){
    res.status(402).json({'mesage':"age r4estricted"})
}else{
    next()
}
}

module.exports = {ageres}