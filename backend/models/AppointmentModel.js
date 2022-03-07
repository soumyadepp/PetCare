const mongoose = require('mongoose')
const schema = require('mongoose').Schema;

const appointmentSchema = new schema({
    date:{
        type: Date,
        required:true,
    },
    time:{
        type:Date,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    doctorId:{
        type:String,
        required:true
    },
    petName:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('appointments',appointmentSchema);