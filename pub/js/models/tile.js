define([
    'models/gameElement',
    'backbone'
], function(GameElement){
    return GameElement.extend({
        coordinates: undefined,
        movementCost: undefined,
        mesh: undefined,
        sideLength: 50,
        initialize: function(scene, coordinates, movementCost){
            this.coordinates = coordinates;
            this.movementCost = movementCost;
            GameElement.prototype.initialize.apply(this, arguments);
            //_.bindAll(this);
        },
        placeUnit: function(unit){
        }
    });
    
});
