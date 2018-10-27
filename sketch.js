// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY

// P5 exported functions (eslint flags)
/* exported preload, setup, draw, keyPressed */

// Exported sprites (eslint flags)
/* exported birdSprite, pipeBodySprite, pipePeakSprite */

var bird;
var pipes;
var parallax = 0.8;
var score = 0;
var maxScore = 0;
var birdSprite;
var pipeBodySprite;
var pipePeakSprite;
var bgImg;
var bgX;
var gameoverFrame = 0;
var die;
var isOver = false;
var audio = new Audio('Musica/music.mp3');
var audioJump = new Audio('Musica/sound-bird.mp3');

var widthRatio;
var heightRatio;
var bestRatio;
var jumpRatio;

var touched = false;
var prevTouched = touched;


function preload() {
  
  pipeBodySprite = loadImage('graphics/guylegs.png');
  pipePeakSprite = loadImage('graphics/guytop.png');
  birdSprite = loadImage('graphics/pigeon.png');
  birdSpriteFlap = loadImage('graphics/pigeonfly.png');
  bgImg = loadImage('graphics/skyline.png');
  die = loadImage('graphics/burst.png')
  //if(localStorage.getItem('maxScore') == "") localStorage.setItem("maxScore", 0);
  if(localStorage.getItem('maxScore')) maxScore = localStorage.getItem('maxScore');
}

function setup() {
  windowWidth = window.innerWidth - 17;
  windowHeight = window.innerHeight - 17;

  widthRatio = windowWidth/800;
  heightRatio = windowHeight/600;
  jumpRatio = (heightRatio + widthRatio) / 2;
  if(heightRatio<widthRatio) bestRatio = heightRatio;
  if(widthRatio <= heightRatio) bestRatio = widthRatio;
  if(windowWidth/800 < windowHeight / 600) textRatio = windowWidth / 800;
  if(windowHeight/600 <= windowWidth/800) textRatio = windowHeight / 600;
  createCanvas(windowWidth, windowHeight);
  
  reset();
  audio.play();
}

function draw() {
  background(0);
  // Draw our background image, then move it at the same speed as the pipes
  image(bgImg, bgX, 0, bgImg.width, height);
  bgX -= pipes[0].speed * parallax;

  // this handles the "infinite loop" by checking if the right
  // edge of the image would be on the screen, if it is draw a
  // second copy of the image right next to it
  // once the second image gets to the 0 point, we can reset bgX to
  // 0 and go back to drawing just one image.
  if (bgX <= -bgImg.width + width) {
    image(bgImg, bgX + bgImg.width, 0, bgImg.width, height);
    if (bgX <= -bgImg.width) {
      bgX = 0;
    }
  }

  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    pipes[i].show();

    if (pipes[i].pass(bird)) {
      score++;
    }

    if (pipes[i].hits(bird)) {
      gameover();
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  bird.update();
  bird.show();

  if ((frameCount - gameoverFrame) % 150 == 0) {
    pipes.push(new Pipe());
  }

  showScores();

  // touches is an list that contains the positions of all
  // current touch points positions and IDs
  // here we check if touches' length is bigger than one
  // and set it to the touched var
  touched = (touches.length > 0);

  // if user has touched then make bird jump
  // also checks if not touched before
  if (touched && !prevTouched) {
    bird.up();
  }

  // updates prevTouched
  prevTouched = touched;


}

function showScores() {
  textSize(32 * bestRatio);
  text('score: ' + score, 1, 32 * bestRatio);
  text('record: ' + localStorage.getItem('maxScore'), 1, 64 * bestRatio);
}

var gameover1;

function gameover() {
  window.location.href = 'game-over.html';
  maxScore = max(score, maxScore);
  localStorage.setItem('maxScore', max(score, maxScore));
  isOver = true;
  noLoop();
  gameover1 = true;

  if(score==localStorage.getItem('maxScore')){
    window.location.href = "fireworks-best-score.html";
  }
}

function reset() {
  isOver = false;
  score = 0;
  bgX = 0;
  pipes = [];
  bird = new Bird();
  pipes.push(new Pipe());
  gameoverFrame = frameCount - 1;
  gameover1 = false;
  loop();
}

function keyPressed() {
  if (key === ' ') {
    bird.up();
    audioJump.play();
    if (isOver) reset(); //you can just call reset() in Machinelearning if you die, because you cant simulate keyPress with code.
  }
}

function touchStarted() {
  if (isOver) reset();
}