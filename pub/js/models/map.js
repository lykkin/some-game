define([
    'backbone'
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
