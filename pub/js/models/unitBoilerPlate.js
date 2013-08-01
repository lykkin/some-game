define([
    'models/gameElement',
    'backbone'
], function(GameElement){
    return GameElement.extend({
        initialize: function(scene){
            GameElement.prototype.initialize.apply(this, scene);
            _.bindAll(this);
        }
    });
});
