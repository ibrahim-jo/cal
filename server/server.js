const express= require('express')
const app=express()
const mongoose = require('mongoose')
const  subrouter=require('./router/subrouter')
const  prouter=require('./router/privetrouter')
const cors  =require('cors')
require('dotenv').config()


///cors

app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE"
}))
app.use(express.json())
///loger
app.use((req,res,next)=>{
   console.log(`${req.method} ${req.path}`)
   next()
})
/// database
mongoose.connect(process.env.DataBase_URL)

const db=mongoose.connection

db.on('error',(err)=>console.log(err) )
db.once('open',()=>console.log('connected db ok'))
///router
app.use('/subroute',subrouter)
app.use('/privet',prouter)

/////port 
const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
  return  console.log(`server ok${PORT}`)
})