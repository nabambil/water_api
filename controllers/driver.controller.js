'use strict';

const Driver = require('../models/driver.model');

const logger = require('../logger');

exports.findAll = function(req, res) {
  Driver.findAll(function(err, driver) {
    // console.log('controller')
    if (err){
        res.send(err);
        logger.warn(err);
    }else
    res.send(driver);
  });
};


exports.create = function(req, res) {
    const new_driver = new Driver(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Driver.create(new_driver, function(err, driver) {
            if (err){
                res.send(err);
                logger.warn(err);
            }else
            res.json({error:false,message:"Driver added successfully!",data:driver});
        });
    }
};


exports.findById = function(req, res) {
    Driver.findById(req.params.id, function(err, driver) {
        if (err){
            res.send(err);
            logger.warn(err);
        }else
        res.json(driver);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Driver.update(req.params.id, new Driver(req.body), function(err, driver) {
            if (err){
                res.send(err);
                logger.warn(err);
            }else
            res.json({ error:false, message: 'Driver successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
  Driver.delete( req.params.id, function(err, driver) {
    if (err){
        res.send(err);
        logger.warn(err);
    }else
    res.json({ error:false, message: 'Driver successfully deleted' });
  });
};