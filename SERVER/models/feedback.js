const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    mobnum:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    query:{
        type:String,
        required:true
    }
})

var Feedback = new mongoose.model('feedback',FeedbackSchema);
module.exports = Feedback;