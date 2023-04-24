const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Lifeline')
.then(()=>{  
        console.log('mongo connected');
})

.catch(()=>{
    console.log('error');
})

const RegisterSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String,
        required:true
    },
    mailID:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    occupation:{
        type:String,
        required:true
    },
    bloodGroup:{
        type:String,
        required:true
    },
    maritalStatus:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

var collection = new mongoose.model('register3',RegisterSchema)

module.exports = collection