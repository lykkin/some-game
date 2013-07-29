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

var counter = 0;
$(document).ready(function(){
	var $container = $('body');
	$container.append(renderer.domElement);
	function draw(){
		counter = (counter+1)%360;
		requestAnimationFrame(draw);
		pointLight.position.x = Math.cos(Math.PI*(counter/180)) * 300;
		pointLight.position.z = Math.cos(Math.PI*(counter/180)) * 300;
		pointLight.position.y = Math.sin(Math.PI*(counter/180)) * 300;
		renderer.render(scene, camera);
	};
	draw()

});
