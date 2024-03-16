'user strict';
var dbConn = require('../config/db.config');

var WateringDriverSession = function (data) {
    this.driver_id = data.driver_id;
};

WateringDriverSession.findDriver = function (result) {
    dbConn.query("Select driver_id from watering_sessions group by driver_id ", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};


module.exports = WateringDriverSession;