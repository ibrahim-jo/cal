
const jwt= require('jsonwebtoken')

const User=require('../models/user')

const verify =(req,res,next)=> {
     
const auth_token= req.headers.auth_token;
const  token=auth_token.split(' ')[1]
if(!token) res.status(401).send('Acsses Denay')
try{
     const verified=jwt.verify(token,process.env.TOKEN_SECRET)

    req.user=verified

     next()
}
catch(err){
      res.json({message:err.message})
} 
    
}


//////AuthAdmin 

const adminouth= async (req,res,next)=>{
   
    const {isAdmin}=await User.findOne(req.user)

if(isAdmin)
      
try{
    console.log('adminis ',isAdmin)
    next()
}
    

catch(err){
      res.json({message:err.message})
} 
else{res.send('you are not  admin')}

}


module.exports = {verify,adminouth}
