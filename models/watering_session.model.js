'user strict';
var dbConn = require('../config/db.config');

//WateringSession object create
var WateringSession = function (data) {
    this.id = data.id;
    this.driver_id = data.driver_id;
    this.lorry_id = data.lorry_id;
    this.start_at = new Date();
    this.stop_at = data.stop_at;
    this.reservoir_start = data.reservoir_start;
    this.reservoir_stop = data.reservoir_stop;
    this.created_at = new Date();
    this.updated_at = new Date();
};

var WateringDriverSession = function (data) {
    this.driver_id = data.driver_id;
};

WateringSession.create = function (data, result) {

    try {
        data.driver_id = data.driver_id.toString().toUpperCase();
        dbConn.query("INSERT INTO watering_sessions set ?", data, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                console.log(res.insertId);
                result(null, res.insertId);
            }
        });
    } catch (error) {
        throw error;
    }

};
WateringSession.findById = function (id, result) {
    dbConn.query("Select * from watering_sessions where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
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

WateringSession.findByDate = function (driver_id, day, month, year, result) {
    var query = "";

    if (day != null) {
        query += "SELECT ROW_NUMBER() OVER () AS row_num,";
    } else if (month != null) {
        query += "SELECT DAY(created_at) as 'day', ";
    } else if (year != null) {
        query += "SELECT MONTH(created_at) as 'month',"
    } else {
        err = "please provide day/month/year in parameter";

        result(err, null);

        return;
    }

    if (day != null) {
        query += "lat_start, long_start, lat_stop, long_stop,";
    }

    if (day != null) {
        query += "cast(consume as decimal(10, 2)) as total_amount ";
    } else if (month != null || year != null) {
        query += "cast(sum(consume) as decimal(10, 2)) as total_amount ";
    }

    query += "from watering_monitoring.watering_sessions ";



    query += "WHERE YEAR(created_at) =" + year;
    query += " AND driver_id ='" + driver_id.toUpperCase() + "'";

    if (day != null) {
        query += " AND MONTH(created_at) = " + month + " AND DAY(created_at) = " + day;
    }
    else if (month != null) {
        query += " AND MONTH(created_at) = " + month;
    }

    if (month == null) {
        query += " group by MONTH(created_at) ";
    }
    else if (day == null) {
        query += " group by DAY(created_at) ";
    }

    dbConn.query(query, function (err, res) {
        console.log(res);
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

WateringSession.findAll = function (result) {
    dbConn.query(`SELECT 
    water.id, 
    water.driver_id,
    water.lorry_id, 
    p1.reservoir as latest_usage, 
    concat(p1.lat,",",p1.longitude) as geolocation, 
    p1.created_at as updated, 
    water.stop_at as activity
        FROM watering_monitoring.watering_sessions AS water
        JOIN watering_monitoring.waters p1 ON (water.id = p1.session_id)
        LEFT OUTER JOIN watering_monitoring.waters p2 ON (water.id = p2.session_id AND 
            (p1.created_at < p2.created_at OR (p1.created_at = p2.created_at AND p1.id < p2.id)))
        WHERE p2.id IS NULL;`, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('watering_sessions : ', res);
            result(null, res);
        }
    });
};
WateringSession.update = function (id, sessions, result) {
    dbConn.query("UPDATE watering_sessions SET stop_at=?,reservoir_stop=?,updated_at=? WHERE id = ?",
        [sessions.stop_at, sessions.reservoir_stop, sessions.updated_at, id],
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
};
WateringSession.delete = function (id, result) {
    dbConn.query("DELETE FROM watering_sessions WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};



module.exports = WateringSession;