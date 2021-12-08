let rigidBody = null;
let g = null;

function setup() {
  rigidBody = new Rect();
  createCanvas(windowWidth, windowHeight);
  g = createVector(0, 100);
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
    this.pin = createVector(100, -30).add(this.p);
    this.r = createVector(0, 0);
  }

  draw() {
    strokeWeight(1);
    rectMode(CENTER);
    translate(this.p);
    // rotate(this.theta.z);
    // rect(0, 0, this.shape.x, this.shape.y);
    ellipse(0, 0, 30, 30);

    resetMatrix();
    rotate(0);
    translate(0, 0);
    strokeWeight(10);
    point(this.pin);
    strokeWeight(1);
    line(this.p.x, this.p.y, this.pin.x, this.pin.y);
  }

  update() {
    // const ur = p5.Vector.normalize(r);
    // const Ft = p5.Vector.mult(ur, ur.dot(F));
    // const a = p5.Vector.sub(Ft, F);
    const r = p5.Vector.sub(this.pin, this.p);
    const r_dot = p5.Vector.sub(r, this.r);
    const I = this.mass * r.magSq();
    const F = p5.Vector.mult(g, this.mass); // F=ma
    const alpha = r.cross(F).div(I);
    // const a = alpha.cross(r).add(p5.Vector.mult(r_dot, this.omega).mult(2));

    // console.log(r);
    this.omega.add(p5.Vector.div(alpha, frameRate()));
    this.theta.add(p5.Vector.div(this.omega, frameRate()));
    this.v.set(this.omega.cross(r));
    this.p.add(p5.Vector.div(this.v, frameRate()));
  }
}
