//load all the required libraries, paths are defined through requirejs,
//and loaded via aliases
//the globals are still available, though using these define methods
//ensures that there won't be any stray race conditions when we start
//breaking things out into class files
define([
    'models/actor',
    'models/actorList',
    'models/map',
    'models/client',
    'backbone', 
    'socketio',
    'three'
    ], function(Actor, ActorList, Map, Client){
        var WIDTH = window.innerWidth - 20,
            HEIGHT = window.innerHeight - 20;

        var VIEW_ANGLE = 45,
            ASPECT = WIDTH / HEIGHT,
            NEAR = 0.1,
            FAR = 500;

        var camera =
            new THREE.PerspectiveCamera(
                VIEW_ANGLE,
                ASPECT,
                NEAR,
                FAR);

        var renderer = new THREE.WebGLRenderer();

        var scene = new THREE.Scene();
        scene.add(camera);

        camera.position.z = 300;

        renderer.setSize(WIDTH, HEIGHT);

        var pointLight =
        new THREE.PointLight(0xFFFFFF);

        // set its position
        pointLight.position.x = 10;
        pointLight.position.y = 50;
        pointLight.position.z = 130;

        // add to the scene
        scene.add(pointLight);

        var sphereMaterial =
        new THREE.MeshPhongMaterial(
            {
            color: 0xCC0000
            });

        var radius = 50,
            segments = 16,
            rings = 40;

        // create a new mesh with
        // sphere geometry - we will cover
        // the sphereMaterial next!
        var sphere = new THREE.Mesh(

        new THREE.SphereGeometry(
            radius,
            segments,
            rings),

        sphereMaterial);

        // add the sphere to the scene
        scene.add(sphere);

        $(document).ready(function(){
            var lightActor = new Actor(pointLight);
            var sphereActor = new Actor(sphere);
            var cameraActor = new Actor(camera);
            var map = new Map(scene, renderer, camera);
            var client = new Client('http://localhost:8001', map, 
                [lightActor]);
            $('body').append(renderer.domElement);
        });
    return {};
    //this is where we pass initialization functions to init.js
});
