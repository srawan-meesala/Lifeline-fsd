const mongoose = require('mongoose');

const AppointSchema = new mongoose.Schema({
    
    username:{
        type:String,
        required:true
    },
    patName:{
        type:String,
        required:true 
    },
    docName:{
        type:String,
        required:true 
    },
    docID:{
        type:String,
        required:true
    },
    hospID:{
        type:String,
        required:true
    },
    Date:{
        type:String,
        required:true
    },
    Timeslot:{
        type:String,
        required:true    
    },
    Contact:{
        type:String,
        required:true
    },
    approved:{
        type:String,
        required:true
    },
    finished:{
        type:String,
        required:true
    }
})

var appointments = new mongoose.model('appoint',AppointSchema)
module.exports = appointments