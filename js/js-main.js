

//Y = (X-A)/(B-A) * (D-C) + C
// X = input, Y = Output, A-B = Input range, D-C = Output range

var uu;
function setup() {
    
    createCanvas(window.innerWidth, window.innerHeight,WEBGL);

    
}

function draw() {
    rotateAmnt = map(mouseX,0,window.innerWidth,0,90);
    background(255);
    fill(255);
    //strokeWeight(2);
   // stroke(51,0,255);
    angleMode(DEGREES);
    rectMode(CENTER);
    translate(0,0,(window.innerWidth/2)*-1);
    //translate(-window.innerWidth/2, -window.innerHeight/2);
    rotateY(-rotateAmnt);
   
    push();
    ambientMaterial(250);
    translate(0,0,window.innerWidth/2);
    rect(0,0,window.innerWidth,window.innerHeight);
    pop();
    
    push();
    specularMaterial(250);
    translate(window.innerWidth/2,0,0);
    rotateY(90);
    rect(0,0,window.innerWidth,window.innerHeight);
    pop();
    
    pointLight(255,255,255,0,0,1440);
   
}