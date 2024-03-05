'use strict';

const Driver = require('../models/driver.model');

const logger = require('../logger');


exports.login = function(req, res) {
    Driver.login(req.body.username,req.body.password, function(err, driver) {
        if (err){
            res.send(err);
            logger.warn(err);
        }
        res.json(driver);
    });
};