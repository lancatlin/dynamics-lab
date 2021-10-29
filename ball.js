class Ball {
  constructor({x, y, r=15, c=[255, 255, 255], uk=0}) {
    this.p = createVector(x, y);
    this.v = createVector(0, 0);
    this.a = createVector(0, 0);
    this.r = r;
    this.uk = uk
    this.color = c;
    console.log(this.r)
  }

  get x() {
    return this.p.x;
  }

  get y() {
    return this.p.y;
  }

  update() {
    this.v.add(p5.Vector.div(this.a, frameRate()));
    this.p.add(p5.Vector.div(this.v, frameRate()));
    this.edge()
    this.friction()
  }

  friction() {
    if (this.uk === 0) {
      return
    }
    if (this.v.magSq() > 0) {
      if (this.v.mag() < this.uk / frameRate()) {
        this.v.set(0, 0)
      } else {
        this.v.sub(p5.Vector.mult(p5.Vector.normalize(this.v), this.uk / frameRate()))
      }
    }
  }

  edge() {
    if (this.p.x > windowWidth - this.r) {
      this.v.x = -Math.abs(this.v.x);
    }
    if (this.p.x < this.r) {
      this.v.x = Math.abs(this.v.x);
    }
    if (this.p.y > windowHeight - this.r) {
      this.v.y = -Math.abs(this.v.y);
    }
    if (this.p.y < this.r) {
      this.v.y = Math.abs(this.v.y);
    }
  }

  tangentAcceleration() {
    const ut = p5.Vector.normalize(this.v);
    return p5.Vector.mult(ut, this.a.dot(ut));
  }

  normalAcceleration() {
    const un = p5.Vector.normalize(p5.Vector.rotate(this.v, HALF_PI));
    return p5.Vector.mult(un, this.a.dot(un));
  }

  drawLine(vector, length) {
    const vp = p5.Vector.add(this.p, p5.Vector.mult(vector, length));
    textSize(24);
    text(`${pretty(vector.mag())}`, vp.x, vp.y);
    line(this.x, this.y, vp.x, vp.y);
  }

  draw() {
    strokeWeight(0)
    fill(...this.color)
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
    fill(0)
  }

  isMoving() {
    return this.v.magSq() !== 0
  }

  touched(ball) {
    const v = p5.Vector.sub(this.p, ball.p)
    return (v.magSq() < sq(this.r+ball.r))
  }
}
