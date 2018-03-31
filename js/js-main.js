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



//set the renderer
var csrenderer = new THREE.CSS3DRenderer();
document.body.appendChild( csrenderer.domElement );
csrenderer.setSize(window.innerWidth, window.innerHeight);


//camera
var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 3000);
camera.position.set( 0, 0, 20 );

//scene
var scene = new THREE.Scene();

//grab an HTML element, set styling
var domElement = document.getElementById("introtext");
domElement.style.width = visibleWidthAtZDepth( -500, camera) + "px";
console.log(visibleHeightAtZDepth( 10000000, camera));
domElement.style.height = visibleHeightAtZDepth( -500, camera) + "px";


//store HTML element in variable, set position
obj = new THREE.CSS3DObject(domElement);
obj.position.z = -500;





//add camera and HTML element to scene
scene.add(obj, camera);

//Push to renderer
csrenderer.render(scene, camera);




//https://stackoverflow.com/questions/15214582/how-do-i-rotate-some-moons-around-a-planet-with-three-js