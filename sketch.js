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
var bgMenu;
var bgImg;
var bgImgPen;
var bgImgFB;
var bgImgDra;
var bgX;
var gameoverFrame = 0;
var die;
var isOver = false;
var audioJump = new Audio('Musica/sound-bird.mp3');
var audioBakc = new Audio('Musica/sb.mp3');
var audioPenguin = new Audio ('Musica/penguinSound.mp3');
var audioDrago = new Audio ('Musica/dragoSound.mp3');
var audioFlappyBird = new Audio ('Musica/birdFlappySound.mp3');
var audioAiroplane = audioFlappyBird;

var widthRatio;
var heightRatio;
var bestRatio;
var jumpRatio;

var touched = false;
var prevTouched = touched;


function preload() {
  
  pipeBodySprite = loadImage('graphics/guylegs.png');
  pipePeakSprite = loadImage('graphics/guytop.png');
  bgImg = loadImage('graphics/fbb.png');
    if(localStorage.getItem("personaggio") == "pidgeot" || localStorage.getItem("personaggio") == null){
      birdSprite = loadImage('graphics/pigeon.png');
      birdSpriteFlap = loadImage('graphics/pigeonfly.png');
    }
    if(localStorage.getItem("personaggio") == "flappy"){
      birdSprite = loadImage('graphics/flappy-original.png');
      birdSpriteFlap = loadImage('graphics/flappy-original.png');
      bgImg = loadImage('graphics/fbb.png');
    }

    if(localStorage.getItem("personaggio") == "penguin"){
      birdSprite = loadImage('graphics/pinguino.png');
      birdSpriteFlap = loadImage('graphics/pinguino.png');
      bgImg = loadImage('graphics/arctic2.jpg'); 
    }

    if(localStorage.getItem("personaggio") == "dragon"){
      birdSprite = loadImage('graphics/drago.png');
      birdSpriteFlap = loadImage('graphics/drago.png');
      bgImg = loadImage('graphics/castle.jpg');
    }

    if(localStorage.getItem("personaggio") == "plane"){
      console.log("plane");
      birdSprite = loadImage('graphics/plane.png');
      birdSpriteFlap = loadImage('graphics/plane.png');
      bgImg = loadImage('graphics/fbb.png');
    }
  

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
  audioBakc.play();
}

function draw() {
  background(0);

  image(bgImg, bgX, 0, bgImg.width, height);
    bgX -= pipes[0].speed * parallax;
  
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
    if(localStorage.getItem("personaggio") == "pidgeot" || localStorage.getItem("personaggio") == null){
      audioJump.play();
        }
     if(localStorage.getItem("personaggio") == "penguin")
     {
      audioPenguin.play(); 
      }
     if(localStorage.getItem("personaggio") == "flappy")
     {
       audioFlappyBird.play();
     }
   
     if(localStorage.getItem("personaggio") == "dragon")
     {  
       audioDrago.play();
     }
     if(localStorage.getItem("personaggio") == "plane"){
       audioJump.play();
     }
    
    if (isOver) reset(); //you can just call reset() in Machinelearning if you die, because you cant simulate keyPress with code.
  }
}
function salta(){
    bird.up();
    if( localStorage.getItem("personaggio") == "pidgeot" || localStorage.getItem("personaggio") == null){
      audioJump.play();
        }
     if(localStorage.getItem("personaggio") == "penguin")
     {
      audioPenguin.play(); 
      }
     if(localStorage.getItem("personaggio") == "flappy")
     {
       audioFlappyBird.play();
     }
   
     if(localStorage.getItem("personaggio") == "dragon")
     {  
       audioDrago.play();
     }
     if(localStorage.getItem("personaggio") == "plane"){
      audioJump.play();
    }
    
    if (isOver) reset(); //you can just call reset() in Machinelearning if you die, because you cant simulate keyPress with code.

}

function touchStarted() {
  if (isOver) reset();
}