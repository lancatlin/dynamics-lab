let rigidBody = null;
function setup() {
  rigidBody = new Rect();
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(200);
  rigidBody.update();
  rigidBody.draw();
}

class Rect {
  constructor() {
    this.p = createVector(windowWidth / 2, windowHeight / 2);
    this.v = createVector(30, 30);
    this.shape = createVector(50, 100);
    this.theta = createVector(0, 0, PI / 3);
    this.omega = createVector(0, 0, 5);
  }

  draw() {
    rectMode(CENTER);
    translate(this.p.x, this.p.y);
    rotate(this.theta.z);
    rect(0, 0, this.shape.x, this.shape.y);
  }

  update() {
    this.p.add(p5.Vector.div(this.v, frameRate()));
    this.theta.add(p5.Vector.div(this.omega, frameRate()));
  }
}
