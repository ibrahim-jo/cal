const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Calori=require('../models/calori')
const {verify,adminouth}=require('./verifytoken')
const { findOne } = require('../models/user')
const calori = require('../models/calori')


router.post('/',verify,async(req,res)=>{
    
       console.log('req.user',req.user)
    const {firstName}=await User.findOne(req.user)
    res.send(firstName)
})

router.post('/admin',verify,adminouth,(req,res)=>{
    
    res.send('you are admin')
})

//entermeals
router.post('/meals',verify,async(req,res)=>{

   const time =dateTime(req.body.date,req.body.time)
   const calori=new Calori({
    meal:req.body.meal ,
    dateTime:time ,
    ncal:req.body.ncal,
    userId:req.user._id
    
})

try{
        const newmeal= await calori.save()
        res.status(200).send(newmeal)

}
catch(error){
      res.status(500).send(error)
}

})
////get meal 
router.get('/meals',verify,async(req,res)=>{

    try{ 
        const meal=await calori.find({userId:req.user._id})
        console.log(meal)

        if(meal.length==0){
            res.send('no mail')

        }
        else{
        res.status(200).send(meal)

        }
   

    } catch(err){
        res.status(500).send(err)
 
    }
    
    
})

router.patch('/meal/:id',verify,async(req,res)=>{
    try{
          const {id}=req.params
         const update=req.body
         const option={new:true}
         const result= await calori.findByIdAndUpdate(id,update,option)
        res.status(200).send(result)

    }
    catch(error){
     res.status(500).send(error)
    }

})

const  dateTime=(d,t)=>{
    const date=new Date(d)
    const time= new Date(t)
  
    const hh = time.getHours()
    const mm=time.getMinutes()
    date.setHours(hh)
    date.setMinutes(mm)
     
     return date
}

module.exports=router