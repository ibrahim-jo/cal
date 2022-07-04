
const express = require('express')
const router=express.Router()
const x=[
    {id:1,name:"user1"},
{id:111,name:"user1"},
{id:2,name:"user2"},
{id:3,name:"user3"},
{id:4,name:"user4"},
{id:5,name:"user5"},
{id:15,name:"user6"},
{id:6,name:"user7"},
{id:7,name:"user8"},
{id:8,name:"user9"},
{id:9,name:"user10"},
{id:10,name:"user11"},
{id:12,name:"user12"},
{id:13,name:"user13"}
]



router.get('/user',(req,res)=>{
    const page= parseInt (req.query.page);
    const limt=parseInt (req.query.limt);
    const startIndex=(page-1) * limt
    const endIndex= page * limt
     result={}
     if(endIndex< x.length){
        result.next={page:page +1, limt:limt}

     }
     if(startIndex>0){
        result.previous={page:page -1, limt:limt}

     }
 result.result = x.slice(startIndex,endIndex);
    res.json(result)
})

router.get('/posts',paginated(x),(req,res)=>{
    res.json(res.paginated)
})


function  paginated (model){
    return(req,res,next)=>{
        const page= parseInt (req.query.page);
    const limt=parseInt (req.query.limt);
    const startIndex=(page-1) * limt
    const endIndex= page * limt
     result={}
     if(endIndex< model.length){
        result.next={page:page +1, limt:limt}

     }
     if(startIndex>0){
        result.previous={page:page -1, limt:limt}

     }
 result.result = model.slice(startIndex,endIndex)
     res.paginated=result
     next()
    }

}

module.exports =  router