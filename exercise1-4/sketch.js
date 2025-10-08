function setup(){
    createCanvas(600, 600);
}

function draw(){
    background(255);
    rectMode(CENTER);
    
    let width = 2 * (mouseX - 300);
    let height = 2 * (mouseY - 300);
    fill(0,100,100);
    rect(300, 300, width, height);
}