
const express = require('express')
const router=express.Router()
const {verify,adminouth,paginated}=require('./verifytoken')
const calori = require('../models/calori')
const formatISO = require('date-fns/formatISO')
router.get('/',verify,async(req,res)=>{

         const {startt}=req.query
         const {endt}=req.query
    try{
    if(startt && endt != undefined ){

        const start=  formatISO( new Date(startt) )
        const  end= formatISO(new Date(endt))
        console.log(start,end)
    
        const result = await calori.find({userId:req.user._id,
            dateTime:{'$gte':start,'$lt':end}})
        res.json(result)
    }
    else{
        const start=  formatISO( new Date(1-1-1950))
        const  end= formatISO(new Date())
        console.log(start,end)
    
        const result = await calori.find({userId:req.user._id,
            dateTime:{'$gte':start,'$lt':end}})
        res.json(result)
    }
    
    }
    catch(err){
        res.json({message: err})

    }
})

module.exports =  router