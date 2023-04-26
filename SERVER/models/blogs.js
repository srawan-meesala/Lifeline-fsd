const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    
    doctname:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true 
    },
    docID:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
})

var blogs = new mongoose.model('blogs',BlogSchema)
module.exports = blogs