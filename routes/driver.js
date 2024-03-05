const express = require('express')
const router = express.Router()
const driverController = require('../controllers/driver.controller');

// Retrieve all waterings
router.get('/', driverController.findAll);

// Create a new watering
router.post('/', driverController.create);

// Retrieve a single watering with id
router.get('/:id', driverController.findById);

// Update a watering with id
router.put('/:id', driverController.update);

// Delete a watering with id
router.delete('/:id', driverController.delete);

module.exports = router