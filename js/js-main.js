//calculate full-width/height view
const visibleHeightAtZDepth = ( depth, camera ) => {
  // compensate for cameras not positioned at z=0
  const cameraOffset = camera.position.z;
  if ( depth < cameraOffset ) depth -= cameraOffset;
  else depth += cameraOffset;

  // vertical fov in radians
  const vFOV = camera.fov * Math.PI / 180; 

  // Math.abs to ensure the result is always positive
  return 2 * Math.tan( vFOV / 2 ) * Math.abs( depth );
};

const visibleWidthAtZDepth = ( depth, camera ) => {
  const height = visibleHeightAtZDepth( depth, camera );
  return height * camera.aspect;
};



//initial variables
var parent, plane1, plane2, plane3,plane4, pivot1, pivot2, pivot3, pivot4;
var filler = document.getElementById('filler');
var zdepth = -1500;
//set the renderer
var csrenderer = new THREE.CSS3DRenderer();
document.body.appendChild( csrenderer.domElement );
csrenderer.setSize(window.innerWidth, window.innerHeight);

//camera
var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 3000);
camera.position.set( 0, 0, 20 );

//scene
var scene = new THREE.Scene();

//create parent
parent = new THREE.CSS3DObject(filler);
scene.add(parent);
parent.position.z = zdepth-visibleWidthAtZDepth(zdepth, camera)/2;




//Create pivots
var pivot1 = new THREE.CSS3DObject(filler);
var pivot2 = new THREE.CSS3DObject(filler);
var pivot3 = new THREE.CSS3DObject(filler);
var pivot4 = new THREE.CSS3DObject(filler);

pivot1.rotation.y = 0;
pivot2.rotation.y = 1.5708;
pivot3.rotation.y = 3.14159;
pivot4.rotation.y = 4.71239;

parent.add(pivot1);
parent.add(pivot2);
parent.add(pivot3);
parent.add(pivot4);

//grab an HTML element, set styling
var domElement = document.getElementById("introtext");
domElement.style.width = visibleWidthAtZDepth( zdepth, camera) + "px";

domElement.style.height = visibleHeightAtZDepth( zdepth, camera) + "px";

var domElement2 = document.getElementById("introtext2");
domElement2.style.width = visibleWidthAtZDepth( zdepth, camera) + "px";
console.log(visibleWidthAtZDepth( zdepth, camera));
domElement2.style.height = visibleHeightAtZDepth( zdepth, camera) + "px";

var domElement3 = document.getElementById("introtext3");
domElement3.style.width = visibleWidthAtZDepth( zdepth, camera) + "px";
domElement3.style.height = visibleHeightAtZDepth( zdepth, camera) + "px";

var domElement4 = document.getElementById("introtext4");
domElement4.style.width = visibleWidthAtZDepth( zdepth, camera) + "px";
domElement4.style.height = visibleHeightAtZDepth( zdepth, camera) + "px";


//store HTML element in variable, set position
plane1 = new THREE.CSS3DObject(domElement);
plane2 = new THREE.CSS3DObject(domElement2);
plane3 = new THREE.CSS3DObject(domElement3);
plane4 = new THREE.CSS3DObject(domElement4);

plane1.position.z = visibleWidthAtZDepth(zdepth, camera)/2;
plane2.position.z = visibleWidthAtZDepth(zdepth, camera)/2;
plane3.position.z = visibleWidthAtZDepth(zdepth, camera)/2;
plane4.position.z = visibleWidthAtZDepth(zdepth, camera)/2;

//add HTML Elements to pivots
pivot1.add(plane1);
pivot2.add(plane2);
pivot3.add(plane3);
pivot4.add(plane4);


//add camera and HTML element to scene
scene.add(parent, camera);

//Push to renderer
render();
function render() {
	
    //parent.rotation.y += 0.01;
    csrenderer.render(scene, camera);

	requestAnimationFrame(render);
}



//https://stackoverflow.com/questions/15214582/how-do-i-rotate-some-moons-around-a-planet-with-three-js