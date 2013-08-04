//actor class, this is the base for anything that is free to move about
//the map.
define([
    'models/gameElement',
    'backbone'
], function(GameElement){
   return GameElement.extend({
        actor: undefined,

        initialize: function(scene, actor){
            this.actor = actor;
            this.constructor.__super__.initialize.apply(this, arguments);
            scene.add(actor);
            _.bindAll(this, 'move');
        },

        move: function(newPos){
            if(typeof newPos.x == 'number'){
                this.actor.position.x = newPos.x;
            }

            if(typeof newPos.y == 'number'){
                this.actor.position.y = newPos.y;
            }

            if(typeof newPos.z == 'number'){
                this.actor.position.z = newPos.z;
            }

            return this;
        }

   });
});
