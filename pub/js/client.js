//mishmash of stuff, need to separate all this out into class files and
//stuff.
var clientModel = Backbone.Model.extend({
	models : [],
	socket : undefined,
	map : undefined,
	initialize: function(models){
		this.models = models;
		this.socket = io.connect('http://localhost:8001');
		console.log(this.socket);
		_.bindAll(this, 'render');
		this.render();
	},
	render: function(){
		_(this.models).each(function(model){
			model.render(0);
		});
	}
	
});

var gameElement = Backbone.Model.extend({
});

var actorModel = Backbone.Model.extend({
	actor: undefined,
	updated: true,

	initialize: function(actor){
		this.actor = actor;
		_.bindAll(this, 'move', 'render', 'update');
		this.render();	
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
	},

	update: function(){

	},
	
	render: function(){
		requestAnimationFrame(this.render);
		renderer.render(scene, camera);
	}
	
});

var WIDTH = window.innerWidth - 20,
    HEIGHT = window.innerHeight - 20;

		console.log(this.socket);
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
	var lightActor = new actorModel(pointLight);
	var sphereActor = new actorModel(sphere);
	var cameraActor = new actorModel(camera);
	var client = new clientModel([lightActor]);
	var counter = 0;
	function moveLight(){
		counter = (counter + 1) %360;
		requestAnimationFrame(moveLight);
		cameraActor.move({
			x: Math.cos((counter/180) * Math.PI) * 100,
			y: Math.sin((counter/180) * Math.PI) * 100,
			//z: Math.cos((counter/180) * Math.PI) * 100
		});
	}
	moveLight();
	$('body').append(renderer.domElement);
});
