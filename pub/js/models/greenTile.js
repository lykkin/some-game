define([
    'models/tile',
    'backbone',
    'three'
], function(Tile){
    return Tile.extend({
        initialize: function(scene, coordinates, movementCost){
            tile = Tile;
            Tile.prototype.initialize.apply(this, arguments);

            this.mesh = new THREE.Mesh(
            
            new THREE.CubeGeometry( 
                this.sideLength,
                this.sideLength,
                this.sideLength
                ),

            new THREE.MeshLambertMaterial({
                    color: 0x00FF00
                })
            );
            //position the tile in the grid
            this.mesh.position.x = coordinates.x * this.sideLength;
            this.mesh.position.y = coordinates.y * this.sideLength;
            this.mesh.position.z = coordinates.z * this.sideLength;

            //add the object to the scene
            this.scene.add(this.mesh);
        }
    });

});
