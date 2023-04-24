const mongoose = require('mongoose');

const HospSchema = new mongoose.Schema({

    hospName:{
        type:String,
        required:true
    },
    mobNum:{
        type:String,
        required:true
    },
    emailID:{
        type:String,
        required:true
    },
    ifDiag:{
        type:String,
        required:true  
    },
    city:{
        type:String,
        required:true  
    },
    odCamp:{
        type:String,
        required:true  
    },
    bloodBank:{
        type:String,
        required:true
    },
    userID:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    },
    approved:{
        type:String,
        required:true
    }
});

var collection2 = new mongoose.model('hospRegister',HospSchema)

module.exports= collection2

 
