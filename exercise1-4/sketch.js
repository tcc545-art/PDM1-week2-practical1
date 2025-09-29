// Empty
function setup() {
    createCanvas(600, 600);
}

function draw() {
    background(0);
    rectMode(CENTER);
    rect(width / 2, height / 2, (mouseX - width / 2) * 2, (mouseY - height / 2) * 2);
}