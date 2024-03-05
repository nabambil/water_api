const express = require('express')
const router = express.Router()
const authenticationController = require('../controllers/authentication.controller');

// Retrieve all waterings
router.post('/', authenticationController.login);

module.exports = router