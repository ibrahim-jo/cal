 
 const mongoose = require('mongoose');

const calori = new mongoose.Schema({
    meal:{type:String,required:true},
    dateTime:{type:Date,required:true},
    ncal:{type:Number,required:true},
    userId:{type:String,required:true},
    created:{type:Date,default:Date.now}


}) ;


module.exports  =mongoose.model('Calori',calori)