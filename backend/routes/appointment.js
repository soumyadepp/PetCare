const express = require('express');
const app = express();
const appointments = require('../models/AppointmentModel');
const vetModel = require('../models/VetModel');
const userModel = require('../models/SignUpModels');
const cors = require('cors')

app.use(cors());
app.use(express.json());

app.get('/appointments/vets/:id', async(req, res) => {
    try {
        const details = await appointments.findOne({ doctorId: req.params.id })
            .then((res) => {
                console.log('fetched appointments');
            })
            .catch(err => {
                console.log(err);
            })
    } catch (error) {
        console.log(error);
    }
})

app.get('/appointments/users/:id', async(req, res) => {
    try {
        const details = await appointments.findOne({ userId: req.params.id })
            .then(res => {
                console.log(res);
            })
            .then(err => {
                console.log(err);
            })
    } catch (error) {
        console.log(error);
    }
})

//request an appointment
app.post('/appointments/users', async(req, res) => {
        try {
            var appointmentDate = new Date(req.body.date);
            var appointmentTime = req.body.time;
            //check if the slot is full or not
            //to check if the time slot of 1 hour is full or not
            var appointment = await appointments.findOne({
                date: appointmentDate,
                time: appointmentTime
            }).then(async(response) => {
                console.log(response);
                if (response == null) {
                    //if the time slot is empty
                    //create a new appointment
                    var newAppointment = new appointments({
                        date: appointmentDate,
                        time: appointmentTime,
                        userId: req.body.userId,
                        doctorId: req.body.doctorId,
                        image: req.body.image,
                        petDetails: req.body.petDetails,
                        description: req.body.description,
                    });
                    newAppointment.save();
                    //increase the appointments of the vet by 1
                    await vetModel.findOneAndUpdate({ _id: req.body.doctorId }, { $inc: { appointments: 1 } });
                    res.send('Appointment request sent');
                } else {
                    //if the time slot is full
                    res.send({ error: 'the time slot is full' });
                }
            })
        } catch (error) {
            console.log(error);
        }
    })
    //approve a request appointment
app.put('/appointments/users/:id', async(req, res) => {
    try {
        var appointment = await appointments.findOne({
            _id: req.params.id
        }).then(async(response) => {
            console.log(response);
            if (response != null) {
                //if the appointment is found
                //update the appointment status to approved
                await appointments.findOneAndUpdate({ _id: req.params.id }, { $set: { status: true } });
                //decrease the appointments of the vet by 1
                await vetModel.findOneAndUpdate({ _id: response.doctorId }, { $inc: { appointments: -1 } });
                res.send('Appointment request approved');
            } else {
                res.send({ error: 'the appointment is not found' });
            }
        })
    } catch (error) {
        console.log(error);
    }
})

//reject an appointment request
app.delete('/appointments/users/:id', async(req, res) => {
    try {
        var appointment = await appointments.findOne({
            _id: req.params.id
        }).then(async(response) => {
            console.log(response);
            if (response != null) {
                //if the appointment is found
                //update the appointment status to rejected
                await appointments.findOneAndUpdate({ _id: req.params.id }, { $set: { status: false } });
                //increase the appointments of the vet by 1
                await vetModel.findOneAndUpdate({ _id: response.doctorId }, { $inc: { appointments: 1 } });
                res.send('Appointment request rejected');
            } else {
                res.send({ error: 'the appointment is not found' });
            }
        })
    } catch (error) {
        console.log(error);
    }
})

//find pending appointments for given vet
app.get('/appointments/vets/pending/:id', async(req, res) => {
    try {
        const details = await appointments.find({ doctorId: req.params.id, status: false })
            .then((response) => {
                res.send(response);
                console.log('fetched appointments');
            })
            .catch(err => {
                console.log(err);
            })
    } catch (error) {
        console.log(error);
    }
})

//finds all appointments for given user
app.get('/appointments/users/all/:id', async(req, res) => {
    try {
        const details = await appointments.find({ userId: req.params.id })
            .then(response => {
                res.send(response);
            })
            .catch(err => {
                res.send(err);
            })
    } catch (error) {
        console.log(error);
    }
})


app.delete('/appointments/:id', async(req, res) => {
    try {
        await appointments.deleteOne({ _id: req.params.id })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    } catch (error) {
        console.log(error);
    }
})

module.exports = app;