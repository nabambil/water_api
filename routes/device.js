
const express = require('express')
const router = express.Router()
const deviceController = require('../controllers/device.controller');

// Retrieve all waterings
router.get('/', deviceController.findAll);

// Create a new watering
router.post('/', deviceController.create);

// Retrieve a single watering with id
router.get('/:id', deviceController.findById);

// Update a watering with id
router.put('/:id', deviceController.update);

// Delete a watering with id
router.delete('/:id', deviceController.delete);

module.exports = router