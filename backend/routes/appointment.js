const express = require('express');
const app = express();
const appointments = require('../models/AppointmentModel');
const cors = require('cors')

app.use(cors());
app.use(express.json());

app.get('/appointments/vets/:id',async(req,res)=>{
    try {
        const details = await appointments.findOne({doctorId:req.params.id})
        .then((res)=>{
            console.log('fetched appointments');
        })
        .catch(err=>{
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }
})

app.get('/appointments/users/:id',async(req,res)=>{
    try {
        const details = await appointments.findOne({userId:req.params.id})
        .then(res=>{
            console.log(res);
        })
        .then(err=>{
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }
})

app.post('/appointments/users',async(req,res)=>{
    try {
        var appointmentDate = new Date(req.body.date);
        appointmentDate = appointmentDate.toLocaleDateString();
        var appointmentTime = new Date(req.body.time);
        appointmentTime = appointmentTime.toLocaleTimeString();
        const appointment = new appointments({
            date: appointmentDate,
            time: appointmentTime,
            userId: req.body.userid,
            doctorId: req.body.doctorid,
            petName: req.body.petName
        });
        await appointment.save()
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }
})

app.delete('/appointments/:id',async(req,res)=>{
    try {
        await appointments.deleteOne({})
    } catch (error) {
        console.log(error);
    }
})

module.exports = app;