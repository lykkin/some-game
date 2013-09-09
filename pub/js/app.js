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
    'three',
    'stats'
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
        camera.position.y = 100;
        camera.position.x = 100;
        camera.up = new THREE.Vector3(0,0,1);
        camera.lookAt(new THREE.Vector3(400,400,0));
        p = camera;
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


    //selection vars
    var selectPlane = undefined;
    var selectionBox = undefined;
    var startPoint = undefined; //first point of diagonal across the selection box
    var endPoint = undefined; //second point of diagonal

	function cameraDirection(){
        var pLocal = new THREE.Vector3( 0, 0, -1 );
        var pWorld = pLocal.applyMatrix4( camera.matrixWorld );
        return pWorld.sub( camera.position ).normalize();
    }
    
    function onDocumentMouseDown( event ) {

        event.preventDefault();

        startPoint = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
        projector.unprojectVector(startPoint, camera);
        unprojStartPoint = startPoint.clone();
        projector.projectVector(startPoint, camera);

        selectPlane = new THREE.PlaneGeometry(0,0);
        selectionBox = (new THREE.Mesh( selectPlane, new THREE.MeshBasicMaterial({transparent:true, opacity:0.15,alphaTest:0.1, color:0x00FF00})));
        selectPlane.vertices[0] = unprojStartPoint;
        scene.add(selectionBox);

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );    
    }

    function onDocumentMouseMove( event ){

        event.preventDefault();

        endPoint = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );

        if(startPoint.distanceTo(endPoint) > 0.01){

            var tempVec = new THREE.Vector3(endPoint.x, startPoint.y, startPoint.z);
            projector.unprojectVector(tempVec, camera);
            selectPlane.vertices[1] = tempVec.clone();

            var tempVec = new THREE.Vector3(startPoint.x, endPoint.y, startPoint.z);
            projector.unprojectVector(tempVec, camera);
            selectPlane.vertices[2] = tempVec.clone();

            projector.unprojectVector(endPoint, camera);
            selectPlane.vertices[3] = endPoint;
            
            selectPlane.computeFaceNormals();
            if(selectPlane.faces[0].normal.dot(cameraDirection()) > 0){
                var flipVertex = selectPlane.vertices[1];
                selectPlane.vertices[1] = selectPlane.vertices[2];
                selectPlane.vertices[2] = flipVertex;
            }

            x = selectPlane;
            y = selectionBox;
            selectPlane.verticesNeedUpdate = true;
            selectPlane.normalsNeedUpdate = true;

            //animate selection box
        }
    }

    function onDocumentMouseUp( event ){
        event.preventDefault();
        document.removeEventListener('mousemove', onDocumentMouseMove, false);
        if(startPoint.distanceTo(endPoint) > 0.01){
            //select with box
        } else {
            var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
            projector.unprojectVector( vector, camera );
            var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
            map.getObject(ray);
        }
        scene.remove(selectionBox);
        selectPlane = undefined;
        selectionBox = undefined;
    }

	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.addEventListener( 'mouseup', onDocumentMouseUp, false );    

        $(document).ready(function(){
            map.addTiles(30,30);
            $('body').append(renderer.domElement);
        });
    return {};
    //this is where we pass initialization functions to init.js
});
