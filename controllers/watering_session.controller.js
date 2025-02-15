'use strict';

const WateringSession = require('../models/watering_session.model');
const WateringDriverSession = require('../models/drivers.model');



const logger = require('../logger');

exports.findAll = function (req, res) {
    WateringSession.findAll(function (err, watering_session) {
        console.log(watering_session);
        if (err) {
            res.send(err);
            logger.warn(err);
        } else
            res.send(watering_session);
    });
};

exports.findAllDriver = function (req, res) {
    WateringDriverSession.findDriver(function (err, watering_session) {
        console.log(watering_session);
        if (err) {
            res.send(err);
            logger.warn(err);
        } else
            res.send(watering_session);
    });
};


exports.insert = function (req, res) {

    const new_watering_session = new WateringSession(req.body);

    //handles null error 
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        WateringSession.create(new_watering_session, function (err, watering_session) {
            if (err) {
                res.send(err);
                logger.warn(err);
            } else
                res.json({ error: false, message: "WateringSession added successfully!", data: watering_session });
        });
    }
};


exports.findById = function (req, res) {
    WateringSession.findById(req.params.id, function (err, watering_session) {
        if (err) {
            res.send(err);
            logger.warn(err);
        } else
            res.json(watering_session);
    });
};


exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        WateringSession.update(req.params.id, new WateringSession(req.body), function (err, watering_session) {
            if (err) {
                res.send(err);
                logger.warn(err);
            } else
                res.json({ error: false, message: 'WateringSession successfully updated' });
        });
    }

};


exports.delete = function (req, res) {
    WateringSession.delete(req.params.id, function (err, watering_session) {
        if (err) {
            res.send(err);
            logger.warn(err);
        } else
            res.json({ error: false, message: 'WateringSession successfully deleted' });
    });
};

exports.findByDate = function (req, res) {
    var day = req.query.day;
    var month = req.query.month;
    var year = req.query.year;
    var driver_id = req.query.driver_id;

    console.log(day);

    WateringSession.findByDate(driver_id, day, month, year, function (err, watering_session) {
        // console.log('controller')
        if (err) {
            res.send(err);
            logger.warn(err);
        } else
            res.send(watering_session);
    });
}