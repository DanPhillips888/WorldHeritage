const express = require('express');
const router = express.Router();
module.exports = router;

const Model = require('../models/model');

//POST data to database
// update to handle WH format
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        location: req.body.location
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
});

//Get all Method
router.get('/getAll', async (req, res) => {
    // res.send('Get All API');
    try {
        const data = await Model.find();
        res.json(data);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
});

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
});

//Get by name
router.get('/getOneByName/:WHName', async (req, res) => {
    try {
        const data = await Model.findOne(
            {WHName: req.params.WHName}
            );
        res.json(data);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
});

//get by location
router.get('/getOneByLoc/:Location', async (req, res) => {
    try {
        const data = await Model.find(
            {Location: req.params.Location}
        );
        res.json(data);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
});

//get by area/zone etc...

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    // res.send('Update by ID APi');
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        );

        res.send(result);
    }
    catch(error) {
        res.status(400).json({message: error.message});
    }
});

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    // res.send('Delete by ID API');
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.send(`Document with ${data.name} has been deleted...`);
    }
    catch(error) {
        res.status(400).json({message: error.message});
    }
});