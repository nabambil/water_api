'user strict';
var dbConn = require('../config/db.config');

//Watering object create
var Watering = function(data){
    this.id             = data.id;
    this.session_id     = data.session_id;
    this.lat            = data.lat;
    this.longitude      = data.longitude;
    this.reservoir      = data.reservoir;
    this.created_at     = new Date();
    this.updated_at     = new Date();
};
Watering.create = function (data, result) {    
    dbConn.query("INSERT INTO waters set ?", data, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            checkSession(data);
            result(null, res.insertId);
        }
    });           
};

function updateStartSession(data) {
    dbConn.query(
        "UPDATE watering_sessions SET lat_start=?,long_start=?, updated_at =? where id=?",
    [data.lat, data.longitude, new Date(), data.session_id], function (err) {             
        if(err) {
            console.log("error: ", err);
        }
    });
}

function updateStopSession(data, start) {
    var usage = data.reservoir - parseFloat(start);
    var roundedNumber = Math.round(usage * 100) / 100;
    dbConn.query(
        "UPDATE watering_sessions SET lat_stop=?,long_stop=?, reservoir_stop=?, consume=?, updated_at =? where id=?",
    [data.lat, data.longitude, data.reservoir, roundedNumber, new Date(), data.session_id], function (err) {             
        if(err) {
            console.log("error: ", err);
        }
    });
}

  
function checkSession(data){
    dbConn.query("SELECT reservoir_start, lat_start FROM watering_sessions WHERE id = ? LIMIT 1 ", data.session_id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
        }else{
            var string= JSON.stringify(res);
            var json = JSON.parse(string);
            var lat = json[0].lat_start;
            var start = json[0].reservoir_start;
            if(lat == null){
                updateStartSession(data);
            }
            else{
                updateStopSession(data, start);
            }
        }
    });
}


Watering.findById = function (id, result) {
    console.log(id);
    dbConn.query("Select * from waters where session_id = ? ", id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};
Watering.findAll = function (result) {
    dbConn.query("Select * from waters", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('waters : ', res);  
            result(null, res);
        }
    });   
};
Watering.update = function(id, watering, result){
  dbConn.query("UPDATE waters SET session_id=?,lat=?,longitude=?,reservoir=?,created_at=?,updated_at=? WHERE id = ?", 
  [watering.session_id,watering.lat,watering.longitude,watering.reservoir,watering.created_at,watering.updated_at, id], 
  function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};
Watering.delete = function(id, result){
     dbConn.query("DELETE FROM waters WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= Watering;