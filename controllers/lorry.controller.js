'use strict';

const Lorry = require('../models/lorry.model');


const logger = require('../logger');

exports.findAll = function(req, res) {
  Lorry.findAll(function(err, lorry) {
    console.log('controller')
    if (err){
        res.send(err);
        logger.warn(err);
    }else
    res.send(lorry);
  });
};


exports.create = function(req, res) {
    const new_lorry = new Lorry(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Lorry.create(new_lorry, function(err, lorry) {
            if (err){
                res.send(err);
                logger.warn(err);
            }else
            res.json({error:false,message:"Lorry added successfully!",data:lorry});
        });
    }
};


exports.findById = function(req, res) {
    Lorry.findById(req.params.id, function(err, lorry) {
        if (err){
            res.send(err);
            logger.warn(err);
        }else
        res.json(lorry);
    });
};

exports.findByPlat = function(req, res) {
    Lorry.findByPlat(req.params.platnumber, function(err, lorry) {
        if (err){
            res.send(err);
            logger.warn(err);
        }else
        res.json(lorry);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Lorry.update(req.params.id, new Lorry(req.body), function(err, lorry) {
            if (err){
                res.send(err);
                logger.warn(err);
            }else
            res.json({ error:false, message: 'Lorry successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
  Lorry.delete( req.params.id, function(err, lorry) {
    if (err){
        res.send(err);
        logger.warn(err);
    }else
    res.json({ error:false, message: 'Lorry successfully deleted' });
  });
};