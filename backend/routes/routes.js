const express = require('express')
const { findOne } = require('../models/SignUpModels')
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUpModels')

router.post('/signup',(request,response) =>{
    try {
        const signedUpUser = new signUpTemplateCopy({
            fullName: request.body.fullName,
            email: request.body.email,
            password: request.body.password
        })
        signedUpUser.save()
        .then(data =>{
            console.log(data);
            response.json(data)
        })
        .catch(error =>{
            response.json(error)
        })
    } catch (error) {
        console.log(error);
    }  
})

router.post('/login',async(request,response)=>{
    try {
        const result = await signUpTemplateCopy.findOne({email:request.body.email,password:request.body.password})
        .then((res)=>{
            response.send(res);
        })
        .catch((err)=>{
            console.log(err);
            response.send({error:'Invalid Credentials'});
        });
    } catch (error) {
        console.log(error);
    }
})
module.exports = router
