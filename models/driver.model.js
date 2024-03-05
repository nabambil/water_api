'user strict';
var dbConn = require('../config/db.config');

//Driver object create
var Driver = function(data){
    this.id             = data.id;
    this.is_active      = data.is_active;
    this.name           = data.name;
    this.username       = data.username;
    this.phone          = data.phone;
    this.password       = data.password;
    this.token          = data.token;
    this.login_session  = data.login_session;
    this.created_at     = new Date();
    this.updated_at     = new Date();
};
Driver.create = function (data, result) {    
    dbConn.query("INSERT INTO drivers set ?", data, function (err, res) {
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

Driver.login = function (username, password, result) {
    dbConn.query("Select * from drivers where username = ? AND password = ?", [username, password],
        function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
            }
        },
    );   
};

Driver.findById = function (id, result) {
    dbConn.query("Select * from drivers where id = ? ", id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};
Driver.findAll = function (result) {
    dbConn.query("Select * from drivers", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('drivers : ', res);  
            result(null, res);
        }
    });   
};
Driver.update = function(id, lorry, result){
  dbConn.query("UPDATE drivers SET is_active=?,name=?,username=?,phone=?,password=?,token=?,login_session=?,created_at=?,updated_at=? WHERE id = ?", 
  [
    lorry.is_active,
    lorry.name,
    lorry.username,
    lorry.phone,
    lorry.password,
    lorry.token,
    lorry.login_session,
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
Driver.delete = function(id, result){
     dbConn.query("DELETE FROM drivers WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= Driver;