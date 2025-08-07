let x = 0;

function setup() {
    createCanvas(600, 600);
}

function draw() {
    background(0);
    circle(x, height / 2, 40);
    x = x + 1;
}