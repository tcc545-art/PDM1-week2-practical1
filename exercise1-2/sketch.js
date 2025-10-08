function setup(){
  createCanvas(600, 600);
}

function draw(){
  background(255);

  // 1st rectangle - left half, full height
  fill(0, 0, 250);
  rect(0, 0, width / 2, height);
  
  // 2nd rectangle - top right quarter
  fill(150, 0, 200);
  rect(width / 2, 0, width / 2, height / 2);
  
  // 3rd rectangle - bottom right quarter (first small one)
  fill(234);
  rect(width / 2, height / 2, width / 4, height / 2);
  
  // 4th rectangle - middle of right side (second small one)
  fill(0);
  rect(width * 0.75, height / 2, width / 4, height / 4);
  
  // 5th rectangle - bottom of right side (third small one)
  fill(0, 100, 100);
  rect(width * 0.75, height * 0.75, width / 4, height / 4);
}