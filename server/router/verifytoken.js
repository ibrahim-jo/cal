
const jwt= require('jsonwebtoken')

const User=require('../models/user')
const Calori=require('../models/calori')

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
//// paginated
  async function paginated(userid,page,limt){
       

         try{
            const   x=await Calori.find({userId:userid}).count()
            const startIndex=page * limt
           // const endIndex= page * limt
             result={}
             if(startIndex< x){
                result.next={page:page +1, limt:limt}
        
             }
             if(startIndex>0){
                result.previous={page:page -1, limt:limt}

             }

         result.result = await Calori.find({userId:userid}).skip((page * limt)>0?(page * limt):0).limit(limt)
             result.len=x
             console.log('r',result)
            }
            catch(err){
                console.log(err)
            }

           return result
}


module.exports = {verify,adminouth,paginated}
