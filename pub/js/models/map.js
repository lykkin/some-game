//this is the map classi, it will hold all map specific data, this
//includes pathing matrices, tilesets, graphics engine data (more to
//come here)

//as there will be one map for each match, they are in charge of
//rendering currently, this may be taken out to the client level if the
//need to start/stop rendering is needed.
define([
    'backbone',
], function(){
    return Backbone.Model.extend({
        scene: undefined,
        renderer: undefined,
        camera: undefined,
        terrainData: undefined,
        tiles: undefined,

        initialize: function(scene, renderer, camera){
            this.scene = scene;
            this.renderer = renderer;
            this.camera = camera;
            _.bindAll(this, 'render');
            this.render();
        },

        render: function(){
            requestAnimationFrame(this.render);
            this.renderer.render(this.scene, this.camera);
        }
    });
});
