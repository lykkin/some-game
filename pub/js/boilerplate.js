//boilerplate for all modules we define, these will be the models and
//views and whatnot files we make.
define([ //define statement for included scripts, include all classes needed here.;
    'jquery', //this is an alias defined in init.js
    'underscore', 
    'backbone', 
    'socket.io',
    'three'
    ], function($, _, Backbone, io, THREE){
    //this is where we return the module object, when included in other
    //define statements, we get a local variable in the call back with
    //this return value stored in it.
    return {};
});
