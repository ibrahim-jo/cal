const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Calori=require('../models/calori')
const {verify,adminouth,paginated}=require('./verifytoken')
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

    const  page= parseInt (req.query.page) ||0;
    const limt=parseInt (req.query.limt);
    try{  
        const  x= await paginated(req.user._id,page,limt)
          
        if(x.length==0){
            res.send('no mail')

        }   
        else{
            res.status(200).send(x)

        }
    }
    catch(err){
        res.status(500).send(err)

    }
    
    
})

router.patch('/meal/:id',verify,async(req,res)=>{
    try{
        const time =dateTime(req.body.dateTime,req.body.time)
          const {id}=req.params
         const update={meal:req.body.meal,ncal:req.body.ncal,dateTime:time}
         const option={new:true}
       const result= await calori.findByIdAndUpdate(id,update,option)
        res.status(200).send(result)

    }
    catch(error){
     res.status(500).send(error)
    }

})

router.delete('/meal/:id',verify,async(req,res)=>{
    const {id}=req.params
    try{
        
        await calori.findByIdAndRemove(id)
        
        res.status(200).send({message:'Deleted...'})
    }
    catch(error){
        console.log(error)

    }
})

router.get('/testmeal',verify,async(req,res)=>{
    const  page= parseInt (req.query.page);
    const limt=parseInt (req.query.limt);
    try{  
        const  x= await paginated(req.user._id,page,limt)
          
        if(x.length==0){
            res.send('no mail')

        }   
        else{
            res.status(200).json(x)

        }
    }
    catch(err){
        res.status(500).send(err)

    }}
)

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