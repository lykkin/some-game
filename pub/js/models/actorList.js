//a simple collection for actors, methods will include efficient
//finds/adds/removes by uuid of actors. nothing too exciting going on
//here
define([
    'backbone',
    'models/actor'
], function(Backbone, Actor){
    return Backbone.Collection.extend({
        model: Actor
    });
});
