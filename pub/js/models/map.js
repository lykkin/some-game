//this is the map classi, it will hold all map specific data, this
//includes pathing matrices, tilesets, graphics engine data (more to
//come here)

//as there will be one map for each match, they are in charge of
//rendering currently, this may be taken out to the client level if the
//need to start/stop rendering is needed.
define([
    'models/greenTile',
    'backbone',
], function(GreenTile){
    return Backbone.Model.extend({
        scene: undefined,
        renderer: undefined,
        camera: undefined,
        terrainData: undefined,
        tiles: undefined,
        actors: undefined,
        intersectObjs: undefined,

        initialize: function(scene, renderer, camera){
            this.tiles = [];
            this.actors = [];
            this.terrainData = [];
            this.intersectObjs = [];
            this.scene = scene;
            this.renderer = renderer;
            this.camera = camera;
            _.bindAll(this, 'render', 'addTiles', 'getObject');
            this.render();
        },

        render: function(){
            requestAnimationFrame(this.render);
            this.renderer.render(this.scene, this.camera);
        },

        addTiles: function(length, width){
            for(var i = 0; i < length; i++){
                var tileRow = [];
                var costRow = [];
                for(var j = 0; j < width; j++){
                    var tile = new GreenTile(this.scene, {x:j, y:i, z:0}, 1);
                    this.intersectObjs.push(tile.mesh);
                    tileRow.push(tile);
                    costRow.push(tile.movementCost);
                }
                this.terrainData.push(costRow);
                this.tiles.push(tileRow);
            }
        },

        getObject: function(ray){
            var intersects = ray.intersectObjects(this.intersectObjs);
            if(intersects.length > 0){
                var selectedMesh = intersects[0].object;
                var selectedTile = this.tiles[selectedMesh.coordinates.x][selectedMesh.coordinates.y];
                this.getMovements(selectedTile, {movement:1});
                intersects[0].object.dispatchEvent({type:'click'});
            }
        },

        getMovements: function(tile, unit){
            
        },
    });
});
