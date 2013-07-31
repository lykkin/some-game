define([
    'backbone',
    'models/actor'
], function(Backbone, Actor){
    return Backbone.Collection.extend({
        model: Actor
    });
});
