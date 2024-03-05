const express = require('express')
const router = express.Router()
const wateringController = require('../controllers/watering.controller');

// Retrieve all waterings
router.get('/', wateringController.findAll);

// Create a new watering
router.post('/', wateringController.create);

// Retrieve a single watering with id
router.get('/:id', wateringController.findById);

// Update a watering with id
router.put('/:id', wateringController.update);

// Delete a watering with id
router.delete('/:id', wateringController.delete);

module.exports = router