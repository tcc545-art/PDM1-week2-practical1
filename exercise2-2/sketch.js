function setup(){
    createCanvas(800, 800);
}

function draw(){
    background(255);
    
    let centreX = mouseX;
    let centreY = mouseY;
    
    // Body

    strokeWeight(15);
    stroke(0);
    fill(255, 204, 0);
    rectMode(CENTER);
    rect(centreX, centreY, 400, 300, 15);
    
    strokeWeight(15);
    stroke(0);
    // Nose and mouth 
    line(centreX + 100, centreY + 50, centreX, centreY);
    line(centreX + 100, centreY + 50, centreX - 20, centreY + 100);

    // Right eye 
    fill(0);
    noStroke();
    circle(centreX + 100, centreY - 50, 70);
    fill(255);
    circle(centreX + 100, centreY - 60, 24);

    // Left eye 
    fill(0);
    noStroke();
    circle(centreX - 100, centreY - 50, 70);
    fill(255);
    circle(centreX - 100, centreY - 60, 24);

    // Legs //900
    strokeWeight(15);
    stroke(0);
    line(centreX + 100, centreY + 150, centreX + 100, centreY + 300);
    line(centreX - 100, centreY + 150, centreX - 100, centreY + 300);
    
    fill(0);
    ellipse(centreX - 130, centreY + 300, 60, 25);
    ellipse(centreX + 130, centreY + 300, 60, 25);
}
