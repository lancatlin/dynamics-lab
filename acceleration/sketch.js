let ball = {}
const m = 2500
const length = 20
const aLength = 200
const SPACE = 32
const usage = "Left click to pull the ball.\nSpace to stop the ball."

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
  text(usage, 20, 30)
  if (mouseIsPressed) {
    ball.a.set(
      (mouseX - ball.p.x) / m,
      (mouseY - ball.p.y) / m,
    )
  } else {
    ball.a.set(0, 0)
  }
  updateBall()
  drawBall()
}

function drawBall() {
  if (mouseIsPressed) {
    stroke(0)
    line(ball.p.x, ball.p.y, mouseX, mouseY)
    text(`${pretty(ball.a.mag())}`, mouseX, mouseY)
    // stroke(100, 100, 255)
    // strokeWeight(4)
    // drawLine(tangent(ball.a, ball.v), aLength)
    // stroke(100, 200, 100)
    // drawLine(normalA(ball.a, ball.v), aLength)
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
  ball.v.add(ball.a)
  ball.p.add(ball.v)
  if (ball.p.x > windowWidth - ball.r || ball.p.x < ball.r) {
    ball.v.x *= -1
  }
  if (ball.p.y > windowHeight - ball.r || ball.p.y < ball.r) {
    ball.v.y *= -1
  }
}

function keyPressed() {
  if (keyCode === SPACE) {
    ball.v = [0, 0]
  }
}

function tangent(a, v) {
  const l = hypotenuse(v)
  const at = (a[0] * v[0] + a[1] * v[1]) / l // dot
  return v.map(x => x * at / l)
}

function squareSum(v) {
  return v[0] * v[0] + v[1] * v[1]
}

function normalA(a, v) {
  const vl = hypotenuse(v)
  const uv = [ v[1], -v[0] ]
  const an = Math.sqrt(squareSum(a), squareSum(tangent(a, v)))
  return uv.map(x => x * an / vl)
}