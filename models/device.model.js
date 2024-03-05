'user strict';
var dbConn = require('../config/db.config');

//Device object create
var Device = function(data){
    this.id             = data.id;
    this.name           = data.name;
    this.uuid           = data.uuid;
    this.is_active      = data.is_active;
    this.created_at     = new Date();
    this.updated_at     = new Date();
};
Device.create = function (data, result) {    
    dbConn.query("INSERT INTO devices set ?", data, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });           
};
Device.findById = function (id, result) {
    dbConn.query("Select * from devices where id = ? ", id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};
Device.findAll = function (result) {
    dbConn.query("Select * from devices", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('devices : ', res);  
            result(null, res);
        }
    });   
};
Device.update = function(id, lorry, result){
  dbConn.query("UPDATE devices SET name=?,uuid=?,is_active=?,created_at=?,updated_at=? WHERE id = ?", 
  [
    lorry.name,
    lorry.uuid,
    lorry.is_active,
    lorry.reservoir,
    lorry.created_at,
    lorry.updated_at, 
    id,
  ], 
  function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err); 
        }else{   
            result(null, res);
        }
    }); 
};
Device.delete = function(id, result){
     dbConn.query("DELETE FROM devices WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= Device;