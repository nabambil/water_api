'user strict';
var dbConn = require('../config/db.config');

//Lorry object create
var Lorry = function(data){
    this.id             = data.id;
    this.platnumber     = data.platnumber;
    this.brand          = data.brand;
    this.model          = data.model;
    this.reservoir      = data.reservoir;
    this.created_at     = new Date();
    this.updated_at     = new Date();
};
Lorry.create = function (data, result) {    
    dbConn.query("INSERT INTO lorries set ?", data, function (err, res) {
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
Lorry.findById = function (id, result) {
    dbConn.query("Select * from lorries where id = ? ", id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};
Lorry.findByPlat = function (platnumber, result) {
    dbConn.query("Select * from lorries where platnumber = ? ", platnumber, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};
Lorry.findAll = function (result) {
    dbConn.query("Select * from lorries", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('lorries : ', res);  
            result(null, res);
        }
    });   
};
Lorry.update = function(id, lorry, result){
  dbConn.query("UPDATE lorries SET platnumber=?,brand=?,model=?,reservoir=?,created_at=?,updated_at=? WHERE id = ?", 
  [
    lorry.platnumber,
    lorry.brand,
    lorry.model,
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
Lorry.delete = function(id, result){
     dbConn.query("DELETE FROM lorries WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= Lorry;