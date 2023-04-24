const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

var collection4 = new mongoose.model('admin',AdminSchema)

module.exports= collection4