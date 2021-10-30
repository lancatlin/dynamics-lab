const strength = 5;
const uk = 200
let cueBall = null;
let cue = null;
const balls = [];

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
  cueBall = new Ball({ x: 350, y: 200, uk });
  cue = new Cue();
  for (let i = 1; i <= 5; i ++) {
    for (let j = 1; j <= 5; j++) {
      balls.push(new Ball({
        x: 100 * i, y: 100 * j, uk, c: [100 + i * 30, 100 + j * 30, 150]
      }))
    }
  }
}

function draw() {
  background(220);
  cueBall.update();
  for (const ball of balls) {
    ball.update()
  }
  checkCollision()
  for (const ball of balls) {
    ball.draw()
  }
  cueBall.draw();
  cue.draw()
}

function checkCollision() {
  const allBalls = [cueBall, ...balls]
  const processed = []
  for (const a of allBalls.filter(v => v.isMoving())) {
    for (const b of allBalls.filter(v => v !== a && !processed.includes(v) && a.touched(v))) {
      // const p = intersection(a, b)
      // point(p)
      // console.log(p)
      collide(a, b)
    }
    processed.push(a)
  }
}

function collide(a, b) {
  const un = p5.Vector.sub(a.p, b.p).normalize()
  const ut = createVector(un.y, -un.x)
  const at = p5.Vector.mult(ut, a.v.dot(ut))
  const an = p5.Vector.mult(un, a.v.dot(un))
  const bt = p5.Vector.mult(ut, b.v.dot(ut))
  const bn = p5.Vector.mult(un, b.v.dot(un))
  a.v.set(p5.Vector.add(at, bn))
  b.v.set(p5.Vector.add(bt, an))
  a.update()
  b.update()
}

function intersection(a, b) {
  const t = (b.x - a.x) / (a.v.x - b.v.x)
  console.log(t)
  return createVector(
    a.x + t * a.v.x,
    a.y + t * a.v.y,
  )
}

function isAllStopped() {
  for (const ball of [cueBall, ...balls]) {
    if (ball.isMoving()) {
      return false
    }
  }
  return true
}

function mousePressed() {
  if (isAllStopped()) {
    cue.activate()
  }
}

function mouseReleased() {
  if (cue.active) {
    cue.deactivate()
  }
}