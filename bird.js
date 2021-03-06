// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY

// Class is exported (eslint flag)
/* exported Bird */

class Bird {
  constructor() {
    this.y = height / 2;
    this.x = width/3;

    this.gravity = 0.55 * jumpRatio;
    this.lift = -8 * jumpRatio;
    this.velocity = 0;

    this.icon = birdSprite;
    this.width = 64 * jumpRatio;
    this.height = 64 * jumpRatio;
  }

  show() {
    // draw the icon CENTERED around the X and Y coords of the bird object
    image(this.icon, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }

  up() {
    this.velocity = this.lift;
  }

  

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.velocity > 0){
      this.icon = birdSpriteFlap;
    }

    if (this.velocity < 0){
      this.icon = birdSprite;
    }
    if(this.y >= height - this.height) {
      this.icon = birdSprite;
    }
    if(gameover1 == true) {
      this.icon = die;
      pipePeakSprite = happyGuy;
    }

    if (this.y >= height - this.height / 2) {
      this.y = height - this.height / 2;
      this.velocity = 0;
    }

    if (this.y <= this.height / 2) {
      this.y = this.height / 2;
      this.velocity = 0;
    }
    
  }
  
}
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

/*function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}*/