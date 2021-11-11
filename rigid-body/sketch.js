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
    this.p = createVector(300, 400);
    this.v = createVector(0, 0);
    this.shape = createVector(50, 100);
    this.theta = createVector(0, 0, PI / 12);
    this.omega = createVector(0, 0, 1);
    this.pin = createVector(10, -10).add(this.p);
  }

  draw() {
    strokeWeight(1);
    rectMode(CENTER);
    translate(this.p);
    rotate(this.theta.z);
    rect(0, 0, this.shape.x, this.shape.y);

    resetMatrix();
    rotate(0);
    translate(0, 0);
    strokeWeight(10);
    point(this.pin);
  }

  update() {
    this.p.add(p5.Vector.div(this.v, frameRate()));
    this.theta.add(p5.Vector.div(this.omega, frameRate()));
  }
}
