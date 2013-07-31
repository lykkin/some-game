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
        actors: undefined,
        initialize: function(connectURL, map, actors){
            this.socket = io.connect(connectURL);
            this.map = map;
            this.actors = new ActorList(actors);
            _.bindAll(this, 'testMove', 'render');
            this.testMove();
            this.render();
        },

        render: function(){
            this.map.render();
        },
        
        counter: 0,
        testMove: function(){
            requestAnimationFrame(this.testMove);
            this.counter = (this.counter + 1) %360;
            var self = this;
            this.actors.map(function(actor){
                console.log(actor.actor.position.x);
                actor.move({
                    x: Math.cos(Math.PI * (self.counter/180)) * 300,
                    y: Math.sin(Math.PI * (self.counter/180)) * 300,
                });
            });
        }
    });
});
