define([
    'backbone'
], function(){
    return Backbone.Model.extend({
        scene: undefined,
        initialize: function(scene){
            this.scene = scene;
        }
    });
})
