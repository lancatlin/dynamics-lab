let rigidBody = null;
let g = null;

function setup() {
  rigidBody = new Rect();
  createCanvas(windowWidth, windowHeight);
  g = createVector(0, 30);
}

function draw() {
  background(200);
  rigidBody.update();
  rigidBody.draw();
}

class Rect {
  constructor() {
    this.mass = 1;
    this.shape = createVector(50, 100);
    this.inertia = (this.mass * this.shape.magSq()) / 3; // 矩形轉動慣量 m*(a^2+b^2) / 3
    this.p = createVector(300, 400);
    this.v = createVector(0, 0);
    this.theta = createVector(0, 0, PI / 12);
    this.omega = createVector(0, 0, 0);
    this.pin = createVector(20, -30).add(this.p);
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
    const r = p5.Vector.sub(this.pin, this.p);
    const F = p5.Vector.mult(g, this.mass); // F=ma
    const ur = p5.Vector.normalize(r);
    const Ft = p5.Vector.mult(ur, ur.dot(F));
    const a = p5.Vector.sub(Ft, F);

    console.log(r);
    this.v.add(p5.Vector.div(a, frameRate()));
    this.p.add(p5.Vector.div(this.v, frameRate()));
    this.theta.add(p5.Vector.div(this.omega, frameRate()));
  }
}
