const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUpModels')

router.post('/signup', (request, response) => {
    try {
        const signedUpUser = new signUpTemplateCopy({
            fullName: request.body.fullName,
            email: request.body.email,
            password: request.body.password
        })
        const isUserExist = signUpTemplateCopy.findOne({ email: request.body.email })
        if (isUserExist) {
            response.send({ error: 'User already exist' })
        } else {
            signedUpUser.save()
                .then(data => {
                    console.log(data);
                    response.json(data)
                })
                .catch(error => {
                    response.json(error)
                })
        }
    } catch (error) {
        console.log(error);
    }
})

router.post('/login', async(request, response) => {
    try {
        const result = signUpTemplateCopy.findOne({ email: request.body.email, password: request.body.password })
            .then((res) => {
                response.send(res);
            })
            .catch((err) => {
                console.log(err);
                response.status(200).send({ error: 'Invalid Credentials' });
            });
    } catch (error) {
        console.log(error);
    }
})
module.exports = router