let ball = {}
const m = 25
const length = 20
const aLength = length
const SPACE = 32
const usage = "Left click to pull the ball.\nSpace to stop the ball.\n"

function setup() {
  createCanvas(windowWidth, windowHeight)
  ball = {
    p: createVector(windowWidth / 2, windowHeight / 2),
    r: 15,
    v: createVector(5, 5),
    a: createVector(0, 0),
  }
}

function draw() {
  background(220)
  textSize(16)
  strokeWeight(1)
  text(usage+`fps: ${Math.round(frameRate())}`, 20, 30)
  updateBall()
  drawBall()
}

function drawBall() {
  if (mouseIsPressed) {
    stroke(0)
    // line(ball.p.x, ball.p.y, mouseX, mouseY)
    drawLine(ball.a, aLength)
    stroke(100, 100, 255)
    strokeWeight(4)
    const t = tangent(ball.a, ball.v)
    drawLine(t, aLength)
    stroke(100, 200, 100)
    const n = normalA(ball.a, ball.v)
    drawLine(n, aLength)
  }
  stroke(200, 100, 100)
  strokeWeight(1)
  drawLine(ball.v, length)
  stroke(0)
  ellipse(ball.p.x, ball.p.y, ball.r * 2 , ball.r * 2)
}

function drawLine(vector, length) {
  const vp = p5.Vector.add(ball.p, p5.Vector.mult(vector, length))
  textSize(24)
  text(`${pretty(vector.mag())}`, vp.x, vp.y)
  line(ball.p.x, ball.p.y, vp.x, vp.y)
}

function pretty(x, n = 100) {
  return Math.round(x * n) / n
}

function updateBall() {
  ball.v.add(p5.Vector.div(ball.a, frameRate()))
  ball.p.add(ball.v)
  if (ball.p.x > windowWidth - ball.r || ball.p.x < ball.r) {
    ball.v.x *= -1
  }
  if (ball.p.y > windowHeight - ball.r || ball.p.y < ball.r) {
    ball.v.y *= -1
  }
  if (mouseIsPressed) {
    ball.a.set(
      (mouseX - ball.p.x) / m,
      (mouseY - ball.p.y) / m,
    )
  } else {
    ball.a.set(0, 0)
  }
}

function keyPressed() {
  if (keyCode === SPACE) {
    ball.v.set(0, 0)
  }
}

function tangent(a, v) {
  const ut = p5.Vector.normalize(v)
  return p5.Vector.mult(ut, a.dot(ut))
}

function normalA(a, v) {
  const un = p5.Vector.normalize(p5.Vector.rotate(v, HALF_PI))
  return p5.Vector.mult(un, a.dot(un))
}