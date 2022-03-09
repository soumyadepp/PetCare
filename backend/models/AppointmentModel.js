const mongoose = require('mongoose')
const schema = require('mongoose').Schema;

const appointmentSchema = new schema({
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    doctorId: {
        type: String,
        required: true
    },
    petDetails: {
        type: {
            name: String,
            age: Number,
            image: String,
            weight: Number,
            breed: String,
        },
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    isApproved: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('appointments', appointmentSchema);