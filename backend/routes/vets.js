const express = require('express');
const app = express();
const vetModel = require('../models/VetModel');
const {cloudinary} = require('../util/cloudinary');


app.get('/vets',async(req,res)=>{
    try {
        const data = await vetModel.find()
        .then(response=>{
            res.send(response);
        })
        .catch(err=>{
            console.log(err);
            res.send(err)
        })
    } catch (error) {
        console.log(error)
    }
});

app.post('/login/vets',async(req,res)=>{
    try {
        const email = req.body.email;
        const phone = req.body.phone;
        const findData = await vetModel.findOne({email:email,phone:phone});
        res.send(findData);
    } catch (error) {
        console.log(error);
    }
})

app.post('/vets',async(req,res)=>{
    try {
        const fname = req.body.image
        const uploadData = await cloudinary.uploader.upload(fname,{
            upload_preset:'dev_preset'
        })
        const imageUrl = uploadData.secure_url
        const newVet = new vetModel({
            name: req.body.name,
            image: imageUrl,
            degree: req.body.degree,
            clinic: req.body.clinic,
            address: req.body.address,
            email : req.body.email,
            phone : req.body.phone,
        });
        await newVet.save();
    } catch (error) {
        console.log(error);
    }
})

module.exports = app;