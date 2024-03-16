const express = require('express')
const router = express.Router()
const wateringSessionController = require('../controllers/watering_session.controller');

// Retrieve all waterings
router.get('/', wateringSessionController.findAll);

router.get('/chart/', wateringSessionController.findByDate);

router.get('/drivers/', wateringSessionController.findAllDriver);

// Create a new watering
router.post('/', wateringSessionController.insert);

// Retrieve a single watering with id
router.get('/:id', wateringSessionController.findById);

// Update a watering with id
router.put('/:id', wateringSessionController.update);

// Delete a watering with id
router.delete('/:id', wateringSessionController.delete);

module.exports = router