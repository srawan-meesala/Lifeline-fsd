const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({

    doctName:{
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
    hospName:{
        type:String,
        required:true  
    },
    hospID:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true  
    },
    spec:{
        type:String,
        required:true  
    },
    price:{
        type:String,
        required:true  
    },
    docID:{
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

var collection6 = new mongoose.model('docRegister',DoctorSchema)

module.exports= collection6

 
