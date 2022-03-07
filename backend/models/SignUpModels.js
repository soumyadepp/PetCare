const mongoose = require('mongoose')

const signUpTemplate = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique:true,
        required: true
    },
    password:{
        type:  String,
        required: true
    },
     date :{
        type: Date,
        default: Date.now
     },
     pets:{
         type:Number,
         default:0
     },
})

module.exports = mongoose.model('mytable',signUpTemplate)