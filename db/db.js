//some db stuff
var mongoose = require('mongoose');
var cache = require('redis');
var schema = require('./schema.js');

mongoose.connect('mongodb://localhost/game_db');

var models = {};
models.User = mongoose.model('User', schema.User);


//turn this into a singleton

var db = {

    'createUser': function(newUser, callback){
        if(!(newUser instanceof Object)){
            callback('input must be an object');
        }

        userModel = new models.User(newUser);
        userModel.save(callback);
    
    },

    'removeUser': function(user, callback){
        if(!(user instanceof Object)){
            callback('no user specified');
        }

        models.User.remove(user, callback);
    },

    'findUser': function(user, callback){
        if(!(user instanceof Object)){
            callback('no user specified');
        }
        models.User.findOne(user, callback);

    }
  
};  //end db object declaration

module.exports = db 
