let cueBall = null;
function setup() {
  createCanvas(windowWidth, windowHeight);
  cueBall = new Ball({ x: 500, y: 500, c: [255, 200, 200]});
}

function draw() {
  background(220);
  cueBall.draw();
}
