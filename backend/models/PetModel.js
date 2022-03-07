const mongoose = require('mongoose');


const petModel = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false
    },
    breed:{
        type:String,
        required:true
    },
    owner:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    weight:{
        type:Number,
        required:true
    },
}); 

module.exports = mongoose.model('pets',petModel);