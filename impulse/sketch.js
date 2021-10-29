const strength = 5;
const uk = 300
let cueBall = null;
let cue = null;

class Cue {
  constructor() {
    this.startPoint = createVector(0, 0);
    this.endPoint = createVector(0, 0);
    this.active = false
  }

  draw() {
    if (this.active) {
      strokeWeight(2)
      line(this.startPoint.x, this.startPoint.y, mouseX, mouseY)
      strokeWeight(10)
      point(this.startPoint)
    }
  } 

  activate() {
    this.startPoint.set(cueBall.x, cueBall.y)
    this.active = true
  }

  deactivate() {
    this.startPoint.set(cueBall.x, cueBall.y)
    this.endPoint.set(mouseX, mouseY)
    this.active = false
    const v = p5.Vector.sub(this.startPoint, this.endPoint)
    cueBall.v.set(p5.Vector.mult(v, strength))
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cueBall = new Ball({ x: 500, y: 500, uk });
  cue = new Cue();
}

function draw() {
  background(220);
  cueBall.update();
  cueBall.draw();
  cue.draw()
}

function isStatic() {
  return cueBall.v.magSq() === 0
}

function mousePressed() {
  if (isStatic()) {
    cue.activate()
  }
}

function mouseReleased() {
  if (cue.active && isStatic()) {
    cue.deactivate()
  }
}