'use strict';

const Watering = require('../models/watering.model');

const logger = require('../logger');

exports.findAll = function(req, res) {
  Watering.findAll(function(err, watering) {
    // console.log('controller')
    if (err){
        res.send(err);
        logger.warn(err);
    }else
    res.send(watering);
  });
};


exports.create = function(req, res) {
    const new_watering = new Watering(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Watering.create(new_watering, function(err, watering) {
            if (err){
                res.send(err);
                logger.warn(err);
            }else
            res.json({error:false,message:"Watering added successfully!",data:watering});
        });
    }
};


exports.findById = function(req, res) {
    // console.log(req.params.id);
    Watering.findById(req.params.id, function(err, watering) {
        if (err){
            res.send(err);
            logger.warn(err);
        }else
        res.json(watering);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Watering.update(req.params.id, new Watering(req.body), function(err, watering) {
            if (err){
                res.send(err);
                logger.warn(err);
            }else
            res.json({ error:false, message: 'Watering successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
  Watering.delete( req.params.id, function(err, watering) {
    if (err){
        res.send(err);
        logger.warn(err);
    }else
    res.json({ error:false, message: 'Watering successfully deleted' });
  });
};