const express = require('express')
const router = express.Router()
const petModel = require('../models/PetModel');
const userModel = require('../models/SignUpModels');
const { cloudinary } = require('../util/cloudinary');
const cors = require('cors');

router.use(cors());
router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ limit: '50mb', extended: true }));

router.get('/pet', async(req, res) => {
    try {
        const result = await petModel.find();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
})
router.get('/pet/:email', async(req, res) => {
    try {
        const email = req.params.email
        const response = await petModel.findOne({ owner: email })
            .then((resp) => {
                res.send(resp);
            })
            .catch((err) => {
                console.log(err);
                res.status(200).send({ error: 'Invalid Credentials' });
            });
    } catch (error) {
        console.log(error);
    }
})
router.post('/pet', async(req, res) => {
    try {
        const fname = req.body.image
        const uploadData = await cloudinary.uploader.upload(fname, {
            upload_preset: 'dev_preset'
        })
        const imageUrl = uploadData.secure_url
        const pet = new petModel({
            name: req.body.name,
            breed: req.body.breed,
            owner: req.body.owner,
            age: req.body.age,
            weight: req.body.weight,
            image: imageUrl
        });
        const data = await userModel.findOne({ email: req.body.owner });
        const numOfPets = data.pets + 1;
        await userModel.findOneAndUpdate({ email: req.body.owner }, { pets: numOfPets });
        await pet.save()
            .then(() => {
                console.log('Uploaded')
            })
    } catch (error) {
        console.log(error)
    }
});
router.delete('/pet/:id', async(req, res) => {
    try {
        const data = petModel.findOne({ _id: req.params.id });
        const ownerEmail = data.owner;
        await petModel.deleteOne({ _id: req.params.id })
            .then(async() => {
                const updateData = await userModel.findOne({ email: ownerEmail });
                const newPets = updateData.pets - 1;
                await findOneAndUpdate({ email: ownerEmail }, { pets: newPets });
            })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;