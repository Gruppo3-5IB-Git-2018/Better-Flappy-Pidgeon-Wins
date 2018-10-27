// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY

// Pipe is exported (eslint flags)
/* exported Pipe */
var peakRatio;
var bodyRatio;
var moving = 0;
var rising;

class Pipe {
  constructor() {
    this.spacing = 200 * jumpRatio;
    this.top = random(height / 8, 5 / 8 * height);
    this.bottom = this.top + this.spacing;
    this.x = width;
    this.w = 80 * widthRatio;
    this.speed = 3 * widthRatio;

    this.passed = false;
    this.highlight = false;
    this.moving = (score + 2) / 15;
    this.rising = floor(random(0, 2));
    this.peakRatio = pipePeakSprite.height / pipePeakSprite.width;
    this.bodyRatio = pipeBodySprite.height / pipeBodySprite.width;
  }

  hits(bird) {
    //return false;
    let halfBirdHeight = bird.height / 2;
    let halfBirdwidth = bird.width / 2;
    if (bird.y - halfBirdHeight < this.top || bird.y + halfBirdHeight > this.bottom) {
      //if this.w is huge, then we need different collision model
      if (bird.x + halfBirdwidth > this.x && bird.x - halfBirdwidth < this.x + this.w) {
        this.highlight = true;
        this.passed = true;
        return true;

      }
    }
    this.highlight = false;
    return false;
  }

  //this function is used to calculate scores and checks if we've went through the pipes
  pass(bird) {
    if (bird.x > this.x + this.w + bird.width && !this.passed) {
      this.passed = true;
      return true;
    }
    return false;
  }

  drawHalf() {
    let howManyNedeed = 0;
    //this way we calculate, how many tubes we can fit without stretching
    howManyNedeed = Math.round(height / (this.w * this.bodyRatio));
    //this <= and start from 1 is just my HACK xD But it's working
    for (let i = 0; i < howManyNedeed; ++i) {
      let offset = this.w * (i * this.bodyRatio + this.peakRatio);
      image(pipeBodySprite, -this.w / 2, offset - 2, this.w, this.w * this.bodyRatio + 2);
    }
    image(pipePeakSprite, -this.w / 2, 0, this.w, this.w * this.peakRatio);
  }

  show() {
    push();
    translate(this.x + this.w / 2, this.bottom);
    this.drawHalf();
    translate(0, -this.spacing);
    rotate(PI);
    this.drawHalf();
    pop();
  }

  update() {
    this.x -= this.speed;
    if (this.moving >= 1) {
      if (this.rising == 0) {
        this.bottom -= this.moving;
        this.top -= this.moving;
        //this.rising = 1;
        if (this.top < (heightRatio * 600) * (1/8)) {
          this.rising = 1;
        }
      }
      if (this.rising == 1) {
        this.bottom += this.moving;
        this.top += this.moving;
        //this.rising = 0;
        if (this.top > (heightRatio * 600) * (17/32)) {
          this.rising = 0;
        }
      }
    }
  }

  offscreen() {
    return (this.x < -this.w);
  }
}
