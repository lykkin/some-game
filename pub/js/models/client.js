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
            var moveFun = (function(moveData){
                this.map.move(moveData);
            }).bind(this);
            this.map.socket = this.socket;
            this.map.socket.on('move', moveFun);
            _.bindAll(this, 'render');
            this.render();
        },

        render: function(){
            this.map.render();
        },
        
    });
});
