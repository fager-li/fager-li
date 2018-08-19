
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
var zdepth = -500;

//set the renderer
var csrenderer = new THREE.CSS3DRenderer();
document.body.appendChild( csrenderer.domElement );
csrenderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener('resize', function(){
csrenderer.setSize(window.innerWidth, window.innerHeight);
});

//camera
var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 3000);
camera.position.set( 0, 0, 20 );

window.addEventListener('resize', function(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

//orbitControls
    //removed oribit controls due to conflict with math

//rotation math
var targetRotationX = 0.5;
var targetRotationOnMouseDownX = 0;

var targetRotationY = 0.2;
var targetRotationOnMouseDownY = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var mouseY = 0;
var mouseYOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var slowingFactor = 0.25;

document.addEventListener( 'mousedown', onDocumentMouseDown, false );


            function onDocumentMouseDown( event ) {

                event.preventDefault();

                document.addEventListener( 'mousemove', onDocumentMouseMove, false );
                document.addEventListener( 'mouseup', onDocumentMouseUp, false );
                document.addEventListener( 'mouseleave', onDocumentMouseOut, false );

                mouseXOnMouseDown = event.clientX - windowHalfX;
                targetRotationOnMouseDownX = targetRotationX;

                mouseYOnMouseDown = event.clientY - windowHalfY;
                targetRotationOnMouseDownY = targetRotationY;
                
            }

            function onDocumentMouseMove( event ) {

                mouseX = event.clientX - windowHalfX;

                targetRotationX = ( mouseX - mouseXOnMouseDown ) * 0.0045;

                mouseY = event.clientY - windowHalfY;

                targetRotationY = ( mouseY - mouseYOnMouseDown ) * 0.00025;
                mouseXOnMouseDown = event.clientX - windowHalfX;
            }

            function onDocumentMouseUp( event ) {

                document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
                document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
                document.removeEventListener( 'mouseleave', onDocumentMouseOut, false );
                console.log("mouseup");
            }

            function onDocumentMouseOut( event ) {

                document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
                document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
                document.removeEventListener( 'mouseleave', onDocumentMouseOut, false );
                console.log("mouseout");
            }


//scene
var scene = new THREE.Scene();

//create parent
parent = new THREE.CSS3DObject(filler);
scene.add(parent);
parent.position.z = zdepth-visibleWidthAtZDepth(zdepth, camera)/2;

window.addEventListener('resize', function(){
parent.position.z = zdepth-visibleWidthAtZDepth(zdepth, camera)/2;
});

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

//grab HTML elements, set styling
var domElement = document.getElementById("introtext");
var domElement2 = document.getElementById("introtext2");
var domElement3 = document.getElementById("introtext3");
var domElement4 = document.getElementById("introtext4");


domElement.style.width = visibleWidthAtZDepth( zdepth, camera) + "px";
domElement.style.height = visibleHeightAtZDepth( zdepth, camera) + "px";


domElement2.style.width = visibleWidthAtZDepth( zdepth, camera) + "px";
domElement2.style.height = visibleHeightAtZDepth( zdepth, camera) + "px";


domElement3.style.width = visibleWidthAtZDepth( zdepth, camera) + "px";
domElement3.style.height = visibleHeightAtZDepth( zdepth, camera) + "px";


domElement4.style.width = visibleWidthAtZDepth( zdepth, camera) + "px";
domElement4.style.height = visibleHeightAtZDepth( zdepth, camera) + "px";

window.addEventListener('resize', function(){
    
    domElement.style.width = visibleWidthAtZDepth( zdepth, camera) + "px";
    domElement.style.height = visibleHeightAtZDepth( zdepth, camera) + "px";


    domElement2.style.width = visibleWidthAtZDepth( zdepth, camera) + "px";
    domElement2.style.height = visibleHeightAtZDepth( zdepth, camera) + "px";


    domElement3.style.width = visibleWidthAtZDepth( zdepth, camera) + "px";
    domElement3.style.height = visibleHeightAtZDepth( zdepth, camera) + "px";


domElement4.style.width = visibleWidthAtZDepth( zdepth, camera) + "px";
domElement4.style.height = visibleHeightAtZDepth( zdepth, camera) + "px";
    
console.log("height:" + domElement4.style.height);
    
});



//store HTML element in variable, set position
plane1 = new THREE.CSS3DObject(domElement);
plane2 = new THREE.CSS3DObject(domElement2);
plane3 = new THREE.CSS3DObject(domElement3);
plane4 = new THREE.CSS3DObject(domElement4);

plane1.position.z = (visibleWidthAtZDepth(zdepth, camera)/2)-1;
plane2.position.z = (visibleWidthAtZDepth(zdepth, camera)/2)-1;
plane3.position.z = (visibleWidthAtZDepth(zdepth, camera)/2)-1;
plane4.position.z = (visibleWidthAtZDepth(zdepth, camera)/2)-1;

window.addEventListener('resize', function(){
    
plane1.position.z = (visibleWidthAtZDepth(zdepth, camera)/2)-1;
plane2.position.z = (visibleWidthAtZDepth(zdepth, camera)/2)-1;
plane3.position.z = (visibleWidthAtZDepth(zdepth, camera)/2)-1;
plane4.position.z = (visibleWidthAtZDepth(zdepth, camera)/2)-1;

    
});

window.addEventListener('resize', function(){
    
    

    
});

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
	requestAnimationFrame(render);
/*    rotateAroundWorldAxis(parent, new THREE.Vector3(0, 1, 0), targetRotationX);*/


    targetRotationY = targetRotationY * (1 - slowingFactor);
    targetRotationX = targetRotationX * (1 - slowingFactor);
    parent.rotation.y += targetRotationX;
    //console.log(targetRotationX);

    csrenderer.render(scene, camera);

	
}

//site navigation

var number = 0;
//function getURL(index) {
// 
//    return "../img/" + index + ".png";
//    
//}
var portfolioData = [
    {title:"Fiktivt Forlag", image:'url("../img/2.png")', desc:"Website and identity for Fiktivt Forlag, student publisher."},
    
    {title:"Westerdals Study Catalogue", image:'url("../img/2.png")', desc:"2016 study catalogue of Westerdals Oslo ACT. Designed with Fiona Jansson."},
    
     {title:"Westerdals Study Catalogue", image:'url("../img/2.png")', desc:"2016 study catalogue of Westerdals Oslo ACT. Designed with Fiona Jansson. 2"},
    
    {title:"Westerdals Study Catalogue", image:'url("../img/2.png")', desc:"2016 study catalogue of Westerdals Oslo ACT. Designed with Fiona Jansson. 3"},
    
    {title:"label3", image:'url("../img/3.png")', desc:"true"},
    
    {title:"label4", image:'url("../img/4.png")', desc:"true"},
    
    {title:"Fiktivt Forlag", image:'url("../img/1.png")', desc:"Website and identity for Fiktivt Forlag, student publisher."},
    
    {title:"label2", image:'url("../img/2.png")', desc:"true"},
    
    ]

//right field
$('#right').click(function() {
    
    if (number+1 == portfolioData.length) {
    
    number = 0;
    
} else if (number+1 <= portfolioData.length) {
    
        number++;
        
} 

document.getElementById('port').style.backgroundImage = portfolioData[number].image; 
document.getElementById('title').textContent = portfolioData[number].title; 
document.getElementById('desc').textContent = portfolioData[number].desc; 
    
    console.log("right"+ " " + number + ", length is" + portfolioData.length);

});

//left field
$('#left').click(function() {
    
    if (number == 0) {
    
        number = portfolioData.length-1;
        
} 
    else if (number <= portfolioData.length) {
    
    number--;
    
    }

document.getElementById('port').style.backgroundImage = portfolioData[number].image; 
document.getElementById('title').textContent = portfolioData[number].title; 
document.getElementById('desc').textContent = portfolioData[number].desc; 
    console.log("left"+ " " + number)
    
});



document.getElementById('port').style.backgroundImage = portfolioData[number].image; 
document.getElementById('title').textContent = portfolioData[number].title; 
document.getElementById('desc').textContent = portfolioData[number].desc; 


