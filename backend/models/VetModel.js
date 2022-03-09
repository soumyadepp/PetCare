const express = require('express');
const mongoose = require('mongoose')
const schema = require('mongoose').Schema;

const vetSchema = new schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    degree: {
        type: String,
        required: true
    },
    clinic: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        default: '9:00'
    },
    endTime: {
        type: String,
        default: '20:00'
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    appointments: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('vets', vetSchema);