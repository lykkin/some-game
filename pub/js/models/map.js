//this is the map class, it will hold all map specific data, this
//includes pathing matrices, tilesets, graphics engine data (more to
//come here)

//as there will be one map for each match, they are in charge of
//rendering currently, this may be taken out to the client level if the
//need to start/stop rendering is needed.
define([
    'models/greenTile',
    'backbone',
    'stats',
], function(GreenTile){
    var stats = new Stats(0);

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.body.appendChild( stats.domElement );

    return Backbone.Model.extend({
        scene: undefined,
        renderer: undefined,
        camera: undefined,
        terrainData: undefined,
        tiles: undefined,
        actors: undefined,
        intersectObjs: undefined,
        socket: undefined,

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

        move: function(moveData){
            this.tiles[moveData.y][moveData.x].select();

        },

        render: function(){
            requestAnimationFrame(this.render);
            stats.begin();
            this.renderer.render(this.scene, this.camera);
            stats.end();
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
                selectedMesh.dispatchEvent({type:'click'});
                this.socket.emit('move', {
                    x:selectedMesh.coordinates.x,
                    y:selectedMesh.coordinates.y
                });


            }
        },

        getMovements: function(tile, unit){
            
        },
    });
});
