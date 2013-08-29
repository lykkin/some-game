//this is going to be a client for a single game, it will handle all the
//socket comm during a match and pass it off to the correct module for
//handling.
define([
    'models/map',
    'models/actor',
    'models/actorList',
    'socketio',
    'backbone'
], function(Map, Actor, ActorList){
    return Backbone.Model.extend({
        socket: undefined,
        map: undefined,
        initialize: function(connectURL, map){
            this.socket = io.connect(connectURL);
            this.map = map;
            _.bindAll(this, 'render');
            this.render();
        },

        render: function(){
            this.map.render();
        },
        
    });
});
