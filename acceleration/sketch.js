let ball = null;
const m = 1;
const length = 1;
const aLength = length;
const SPACE = 32;
const usage = "Left click to pull the ball.\nSpace to stop the ball.\n";

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = new Ball(windowWidth / 2, windowHeight / 2, 15);
}

function draw() {
  background(220);
  textSize(16);
  strokeWeight(1);
  text(usage + `fps: ${Math.round(frameRate())}`, 20, 30);
  ball.update();
  if (mouseIsPressed) {
    ball.a.set((mouseX - ball.p.x) / m, (mouseY - ball.p.y) / m);
  } else {
    ball.a.set(0, 0);
  }
  drawBall();
}

function drawBall() {
  if (mouseIsPressed) {
    stroke(0);
    // line(ball.p.x, ball.p.y, mouseX, mouseY)
    ball.drawLine(ball.a, aLength);
    stroke(100, 100, 255);
    strokeWeight(4);
    ball.drawLine(ball.tangentAcceleration(), length);
    stroke(100, 200, 100);
    ball.drawLine(ball.normalAcceleration(), length);
  }
  stroke(200, 100, 100);
  strokeWeight(1);
  ball.drawLine(ball.v, length);
  stroke(0);
  ball.draw();
}

function pretty(x, n = 1) {
  return Math.round(x * n) / n;
}

function keyPressed() {
  if (keyCode === SPACE) {
    this.v.set(0, 0);
  }
}
