const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt= require('jsonwebtoken')
const {verify}=require('./verifytoken')
const Paginated =require('./test')

//Getall 
router.get('/',async(req,res)=>{
   // res.send('Hello fuker')
    try{
        const user = await User.find()
        res.json(user)

    }catch(res){
        res.status(500).json({message:err.message})

    }
})
//GEtone 
router.get('/:id',getuse,(req,res)=>{

    res.send(res.user.firstName)
})
//Creat
router.post('/register',async(req,res)=>{

    const existEmail=await User.findOne({email: req.body.email})
      if(existEmail){
          res.status(400).send('emailexist')
      }
    const user= new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password:req.body.password
    })

try{
      
        const newUser = await user.save()
        const token=jwt.sign({_id:newUser._id,isAdmin:newUser.isAdmin},process.env.TOKEN_SECRET)
         const n={token,...newUser}

        res.status(201).json(n)
    
}
catch(err){
    res.status(400).json({message:err.message})
}


})
//login
router.post('/login',async(req,res)=>{
    try{

        const user = await User.findOne({email:req.body.email})
    if(!user){
         res.status(401).json({message:'no email'})
        
    }
    else if
    (user.password !==  req.body.password){
        res.status(401).json({message:'invalid password'})
        console.log(user.password)
    }
   else ////create token
   {
       const token=jwt.sign({_id:user._id,isAdmin:user.isAdmin},process.env.TOKEN_SECRET)
       res.json({ firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        token})
   }
    }
    catch(err){
        res.json({err:err.message})

    }

})
//Update 
router.patch('/:id',getuse,async(req,res)=>{

    if(req.body.firstName !=null){
          
        res.user.firstName=req.body.firstName
    }

    if(req.body.email!=null){
        res.user.email=req.body.email
    }
    
    try {
       
           const updateuser= await res.user.save()
          res.send(updateuser)
       
        }
        catch(err){
             res.status(500).json({message:err.message})
        }

})

//Delet 

router.delete('/:id',verify,async(req,res)=>{
       const verified=req.user
    try{
         const  user=await User.findById(req.params.id)
           console.log('allowd to delet:',req.user._id,verified.isAdmin)
        if(user.id==verified._id || verified.isAdmin){
           await User.deleteOne(user)
            res.status(200).json('Deleted user')
        }
        else{
            res.status(401).send('not allowed')
        }
        
    }
    catch(err){
        res.status(500).json({message:err.message})

    }

})
///////////test
router.get('/test1',(req,res)=>{
     
     
//     const date=new Date(req.body.date)
//     const time= new Date(req.body.time)
//   // const newDate=fns.formatISO(date,{representation:'date'})
//   // const newTime=fns.formatISO(time,{representation:'time'})
//    // const dateTime=`${newDate}T${newTime}`
//     const hh = time.getHours()
//     const mm=time.getMinutes()
//     date.setHours(hh)
//     date.setMinutes(mm)
     
//       res.status(200).send(date)

})

//midllware  getuser
async function  getuse (req,res,next){
    let user 
    try{
        user=await User.findById(req.params.id)

    if(user==null){
        res.status(400).json('not a user')

    }}
    catch(err){
        res.status(500).json({message:err.message})
    }
      res.user=user
      next()


}



module.exports = router
