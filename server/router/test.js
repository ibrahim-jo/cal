
const express = require('express')
const router=express.Router()
const {verify,adminouth,paginated}=require('./verifytoken')
const calori = require('../models/calori')
const formatISO = require('date-fns/formatISO')
const User =require( '../models/user')
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

router.get('/control',verify,adminouth,async(req,res)=>{
    const  page= parseInt (req.query.page) ||0;
    const limt=parseInt (req.query.limt);
    const startIndex =page * limt;
    const count= await User.aggregate([{$count:'mycount'}])
    const x=count[0].mycount
    result = {};
    if (startIndex < x) {
      result.next = { page: page + 1, limt: limt };
    }
    if (startIndex > 0) {
      result.previous = { page: page - 1, limt: limt };
    }
    result.data=await User.find().skip(page * limt > 0 ? page * limt : 0)
    .limit(limt);
   console.log('x',count[0].mycount)
//    const result= await User.aggregate([
//     idConversionStage = {
//         $addFields: {
//            convertedId: { $toString: "$_id" }
//         }
//      },
//     { $lookup: 
//     {
//      from: 'caloris', 
//      localField: 'convertedId' , 
//      foreignField: 'userId', 
//      as: "usermeals",
//      pipeline:[
//         {

//             $group:{
                 
//                 _id:'$userId',
//                 count:{
//                     $count:{}
//                 }
//             }
//          }
//      ]
//      }},
     


// ])

  res.send(result)
})



module.exports =  router