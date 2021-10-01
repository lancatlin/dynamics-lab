let ball = {}
const m = 2500
const length = 20
const aLength = 100
const SPACE = 32

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight)
  ball = {
    x: windowWidth / 2,
    y: windowHeight / 2,
    r: 15,
    v: [5, 5],
    a: [0, -0.2],
  }
}

function draw() {
  // put drawing code here
  background(220)
  if (mouseIsPressed) {
    ball.a = [
      (mouseX - ball.x) / m,
      (mouseY - ball.y) / m,
    ]
  } else {
    ball.a = [0, 0]
  }
  updateBall()
  drawBall()
}

function drawBall() {
  if (mouseIsPressed) {
    stroke(0)
    line(ball.x, ball.y, mouseX, mouseY)
    text(`${pretty(hypotenuse(ball.a[0], ball.a[1]))}`, mouseX, mouseY)
    stroke(100, 100, 255)
    strokeWeight(4)
    drawLine(tangent(ball.a, ball.v), aLength)
    stroke(100, 200, 100)
    drawLine(normalA(ball.a, ball.v), aLength)
  }
  stroke(200, 100, 100)
  strokeWeight(1)
  drawLine(ball.v, length)
  stroke(0)
  ellipse(ball.x, ball.y, ball.r * 2 , ball.r * 2)
}

function drawLine(vector, length) {
  vp = [ball.x + vector[0] * length, ball.y + vector[1] * length]
  textSize(24)
  text(`${pretty(hypotenuse(vector[0], vector[1]))}`, vp[0], vp[1])
  line(ball.x, ball.y, vp[0], vp[1])
}

function hypotenuse(a, b) {
  return Math.sqrt(a*a + b*b)
}

function pretty(x, n = 100) {
  return Math.round(x * n) / n
}

function updateBall() {
  ball.v = ball.v.map((v, i) => v + ball.a[i])
  ball.x += ball.v[0]
  ball.y += ball.v[1]
  if (ball.x > windowWidth || ball.x < 0) {
    ball.v[0] *= -1
  }
  if (ball.y > windowHeight || ball.y < 0) {
    ball.v[1] *= -1
  }
}

function keyPressed() {
  if (keyCode === SPACE) {
    ball.v = [0, 0]
  }
}

function tangent(a, v) {
  const at = a[0] * v[0] + a[1] * v[1] // dot
  const l = hypotenuse(v[0], v[1])
  return [at * v[0] / l, at * v[1] / l]
}

function normalA(a, v) {
  const uv = [v[1], -v[0]]
  return tangent(a, uv)
}