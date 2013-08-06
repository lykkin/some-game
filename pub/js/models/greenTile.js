define([
    'models/tile',
    'backbone',
    'three',
], function(Tile){
    return Tile.extend({
        initialize: function(scene, coordinates, movementCost, objList){
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

            var select = (function(event){
                console.log('test');
                w = this.mesh;
                if(this.mesh.material.color.r == 1){
                    this.mesh.material.color.g = 1;
                    this.mesh.material.color.r = 0;
                } else {
                    this.mesh.material.color.g = 0;
                    this.mesh.material.color.r = 1;
                }
            }).bind(this);
            this.mesh.addEventListener('click', select);

            objList.push(this.mesh);
            //add the object to the scene
            this.scene.add(this.mesh);
        }
    });

});
