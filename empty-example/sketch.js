let ball = {}
const m = 2500
const length = 20
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
    text(`${resultantForce(ball.a[0], ball.a[1])}`, mouseX, mouseY)
  }
  vp = [ball.x + ball.v[0] * length, ball.y + ball.v[1] * length]
  stroke(200, 100, 100)
  line(ball.x, ball.y, vp[0], vp[1])
  stroke(0)
  ellipse(ball.x, ball.y, ball.r * 2 , ball.r * 2)
}

function resultantForce(a, b) {
  return Math.round(Math.sqrt(a*a + b*b) * 100) / 100
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