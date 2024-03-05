'use strict';

const Device = require('../models/device.model');

const logger = require('../logger');



exports.findAll = function(req, res,next) {
  Device.findAll(function(err, device) {
    // console.log('controller')
    if (err){
        res.send(err);
        logger.warn(err);
    }else
    res.send(device);
  });
};


exports.create = function(req, res,next) {
    const new_device = new Device(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Device.create(new_device, function(err, device) {
            if (err){
                res.send(err);
                logger.warn(err);
            }else
            res.json({error:false,message:"Device added successfully!",data:device});
        });
    }
};


exports.findById = function(req, res,next) {
    Device.findById(req.params.id, function(err, device) {
        if (err){
            res.send(err);
            logger.warn(err);
        }else
        res.json(device);
    });
};


exports.update = function(req, res,next) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Device.update(req.params.id, new Device(req.body), function(err, device) {
            if (err){
                res.send(err);
                logger.warn(err);
            }else
            res.json({ error:false, message: 'Device successfully updated' });
        });
    }
  
};


exports.delete = function(req, res,next) {
  Device.delete( req.params.id, function(err, device) {
    if (err){
        res.send(err);
        logger.warn(err);
    }else
    res.json({ error:false, message: 'Device successfully deleted' });
  });
};