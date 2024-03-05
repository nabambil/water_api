const express = require('express')
const router = express.Router()
const lorryController = require('../controllers/lorry.controller');

// Retrieve all waterings
router.get('/', lorryController.findAll);

// Create a new watering
router.post('/', lorryController.create);

// Retrieve a single watering with id
router.get('/:id', lorryController.findById);

// Retrieve a single watering with platnumber
router.get('/platnumber/:platnumber', lorryController.findByPlat);

// Update a watering with id
router.put('/:id', lorryController.update);

// Delete a watering with id
router.delete('/:id', lorryController.delete);

module.exports = router