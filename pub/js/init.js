//initialization for application, define lib paths and load the require
//application handler
require.config({
    paths: {
        jquery: 'lib/jquery-2.0.3.min',
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min',
        three: 'lib/three.min',
        socketio: '/socket.io/socket.io',
    },
    //shims are used to ensure dependencies are met before the use
    //of a library, in this case, jquery and underscore will be
    //included when backbone is. 
    //only use shims in case of scripts that don't use define (e.g.
    //library scripts like backbone)
    shim: {
        backbone: {
            deps: ['jquery','underscore'],
            exports: 'Backbone'
        },
        three: {
            exports: 'THREE'
        },
        socketio: {
            exports: 'io'
        },
        underscore: {
            exports: '_'
        },
        jquery: {
            exports: '$'
        },
    }
});

require([
  'app',
], function(App){

    //if we need to do anything for application initialization, it goes
    //here, but there is nothing we are doing for now.
});
