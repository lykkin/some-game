//load all the required libraries, paths are defined through requirejs,
//and loaded via aliases
//the globals are still available, though using these define methods
//ensures that there won't be any stray race conditions when we start
//breaking things out into class files


//this is currently the set up for the graphics engine, this might be
//pushed into the client or map initialization later
define([
    'models/actor',
    'models/actorList',
    'models/map',
    'models/client',
    'models/greenTile',
    'backbone', 
    'socketio',
    'three'
    ], function(Actor, ActorList, Map, Client, GreenTile){
        var WIDTH = window.innerWidth - 20,
            HEIGHT = window.innerHeight - 20;

        var VIEW_ANGLE = 45,
            ASPECT = WIDTH / HEIGHT,
            NEAR = 0.1,
            FAR = 10000;

        var camera =
            new THREE.PerspectiveCamera(
                VIEW_ANGLE,
                ASPECT,
                NEAR,
                FAR);

        var renderer = new THREE.WebGLRenderer();

        var scene = new THREE.Scene();

        camera.position.z = 300;
        camera.position.y = 0;
        camera.position.x = 0;
        camera.up = new THREE.Vector3(0,0,1);
        camera.lookAt(new THREE.Vector3(400,400,0));

        renderer.setSize(WIDTH, HEIGHT);

        var pointLight =
        new THREE.PointLight(0xFFFFFF);

        // set its position
        pointLight.position.x = 10;
        pointLight.position.y = 50;
        pointLight.position.z = 130;


	//add mouselistener to objects
	var projector = new THREE.Projector();
    var map = new Map(scene, renderer, camera);
    var lightActor = new Actor(scene, pointLight);
    var cameraActor = new Actor(scene, camera);
    var client = new Client('http://localhost:8001', map);
	
	function onDocumentMouseDown( event ) {
                event.preventDefault();
                var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
                projector.unprojectVector( vector, camera );
                var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
                map.getObject(ray);
            }

	document.addEventListener( 'mousedown', onDocumentMouseDown, false );

        $(document).ready(function(){
            map.addTiles(30,30);
            $('body').append(renderer.domElement);
        });
    return {};
    //this is where we pass initialization functions to init.js
});
