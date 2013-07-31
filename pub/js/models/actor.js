define([
    'backbone'
], function(Backbone){
   return Backbone.Model.extend({
        actor: undefined,

        initialize: function(actor){
            this.actor = actor;
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
        }

   });
});
