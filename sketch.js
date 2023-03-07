//// global values
////P5.PLAY AND P5.SOUND ARE NEEDED FOR THIS CODE TO WORK
//// Def gonna be very similar to last project since it's the same shell, hopefully just more improved. I used The Broken Hero as a template for The Broken Hearts, the sequel.



//// game control
let stage = 0 // keeps track of your functions
const margin = 50; // sets margin to 50 pixels
let fontSize = window.innerWidth * 0.02; // sets font size to 2% of window width
let x1 = window.innerWidth * 0.13; // sets x position of first text to 10% of window width
let x2 = window.innerWidth * 0.29; // sets x position of second text to 30% of window width
let y = window.innerHeight * 0.05; // sets y position of both texts to 5% of window height
let xTitle = window.innerWidth * 0.5; // sets x position of title to 50% of window width
let yTitle = window.innerHeight * 0.5; // sets y position of title to 50% of window height

//// player 1
let p1X = window.innerWidth * 0.3; // p1 = player 1, x = x axis, y = y axis
let p1Y = window.innerHeight * 0.5;
// player 1 size
let pWidth = window.innerWidth * 0.10;
let pHeight = window.innerHeight * 0.15;


//// box platforms
let b1X = window.innerWidth * 0.75;  // b1 = box 1
let b1Y = window.innerHeight * 0.3;
let b2X = window.innerWidth * 0.45;  // box 2
let b2Y = window.innerHeight * 0.6;
let b3X = window.innerWidth * 0.15;  // box 3
let b3Y = window.innerHeight * 0.2;
// box platform size
let bWidth = window.innerWidth * 0.20;
let bHeight = window.innerHeight * 0.05;


//// hearts
let h1X = window.innerWidth * 0.75; // h1 = heart 1
let h1Y = window.innerHeight * 0.2;
let h2X = window.innerWidth * 0.45; // heart 2
let h2Y = window.innerHeight * 0.5;
let h3X = window.innerWidth * 0.15; // heart 3
let h3Y = window.innerHeight * 0.1;
// heart size
let hWidth = window.innerWidth * 0.04;
let hHeight = window.innerHeight * 0.04;


//// flower
let f1X; // f1 = flower 1
let f1Y;
let fWidth;
let fHeight;


//// chocolate
let c1X; // c1 = chocolate 1
let c1Y;
let cWidth;
let cHeight;


//// ghoulkings
let g1X;
let g1Y;
let g2X; 
let g2Y;
let g3X; 
let g3Y; //(nice)
let gWidth, gHeight;
let gSpeed = 100;


//// counter
let score = 0;
let lives = 3;


//// gravity
let jump = false; // boolean for jumping
let direction = 2; // force of Y gravity (1 = down, -1 = up) 
let velocity = 10; // speed of player 1 falling
let jumpPower = 20; // strength of player 1 jump
let fallingSpeed = 5; // equal to velocity * direction
let minHeight = window.innerHeight * 0.9; // height of ground 
let maxHeight = window.innerHeight * 0.1; // height of sky 
let jumpCounter = 0; // keeps track of jumps (2 = double jump)


//// multimedia
let hero; // can't use player as a variable name bc it already exists
let platform; // can't use box as a variable name bc it already exists
let landscape; // can't use background as a variable name bc it already exists
let jumpSound;
let lifeSound;
let heart;
// audio variables
let hasPlayedSound = false; // boolean for sound effect
let lastJumpSoundTime = 0; // variable to store the time when the jump sound was last played
let tbhFont; // variable for font
let ghoulking;
let introSong;
let loseSound;


// generate random color
const r = Math.floor(Math.random() * 256); // this is the code that generates a random color for the text in the game
const g = Math.floor(Math.random() * 256); 
const b = Math.floor(Math.random() * 256);
const color = `rgb(${r}, ${g}, ${b})`;


// generate a random color 2
const r2 = Math.floor(Math.random() * 256);
const g2 = Math.floor(Math.random() * 256);
const b2 = Math.floor(Math.random() * 256);
const color2 = `rgb(${r2}, ${g2}, ${b2})`;


//// setup //////////////////////////////////////////// 
function setup() { // this is the setup function that will only run once at the beginning of the game
  introSong.play();
  setTimeout(function() {
    introSong.play();
  }, 35000); // 15000 milliseconds = 15 seconds
  createCanvas(); // this is the code that creates the canvas for the game to be played in
  rectMode (CENTER); // this is the code that makes the rectangles appear in the center of the screen
  textAlign (CENTER); // this is the code that makes the text appear in the center of the screen
  imageMode (CENTER); // this is the code that makes the images appear in the center of the screen
  frameRate(60); // this is the code that sets the frame rate of the game to 60 fps
  g1X = random(width * 0.1, width * 0.4);
  g1Y = random(height * 0.1, height * 0.9);
  g2X = random(width * 0.4, width * 0.7);
  g2Y = random(height * 0.1, height * 0.9);
  g3X = random(width * 0.7, width * 0.9);
  g3Y = random(height * 0.1, height * 0.9);
  gWidth = p1X * 0.15;
  gHeight = p1Y * 0.15;
}// end setup
  

//// splash //////////////////////////////////////////// 
function splash () {
  // title  appearance
  image(landscape, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight) // this is the background image of the game
  textSize(fontSize * 3);
  textFont(tbhFont);
  stroke(147, 113, 43);
  strokeWeight(10);
  fill(129, 147, 43);
  text('THE BROKEN HEARTS', xTitle, yTitle - 150);

  // instructions
  textSize(fontSize);
  textFont(tbhFont);
  stroke(147, 113, 43);
  fill(255)
  strokeWeight(10);
  text('Use WASD or ARROW KEYS to move and jump', xTitle, yTitle);
  

  // flashing text
  textSize(fontSize * 2);
  textFont(tbhFont);
  stroke(147, 113, 43);
  strokeWeight(10);
  if (frameCount % 60 < 30) { // alternate fill color every 30 frames
    fill(129, 147, 43);
  } else {
    fill(255); // set fill color to white
  }
  text('CLICK TO START', xTitle, yTitle + 150);


} // this is the splash function that will be called in the draw function below


//// ghoulking movement ////////////////////////////////////////////
function moveGhoulking(x, y) {
  // move ghoulking randomly
  // Move ghoulking 1
  g1X += random(-25, 25);
  g1Y += random(-25, 25);
  
  // Move ghoulking 2a
  g2X += random(-25, 25);
  g2Y += random(-25, 25);
  
  // Move ghoulking 3
  g3X += random(-25, 25);
  g3Y += random(-25, 25);
  
  // Keep ghoulkings on screen
  g1X = constrain(g1X, gWidth/2, windowWidth - gWidth/2);
  g1Y = constrain(g1Y, gHeight/2, windowHeight - gHeight/2);
  g2X = constrain(g2X, gWidth/2, windowWidth - gWidth/2);
  g2Y = constrain(g2Y, gHeight/2, windowHeight - gHeight/2);
  g3X = constrain(g3X, gWidth/2, windowWidth - gWidth/2);
  g3Y = constrain(g3Y, gHeight/2, windowHeight - gHeight/2);
}

//// game code //////////////////////////////////////////// 
function game (){ // this is the game function that will be called in the draw function below
  // game appearance
    background(150, 230, 240); // sky blue
    image(landscape, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight) // this is the background image of the game

  // window frame
    noFill(color);
    stroke(color2); 
    strokeWeight(15);
    rect(width / 2, height / 2, width, height); // this is the window frame that the game is in

  // create box platforms
    image(platform, b1X, b1Y, bWidth, bHeight); // this is the image of the box platform, should I change the image for each box?
    image(platform, b2X, b2Y, bWidth, bHeight);
    image(platform, b3X, b3Y, bWidth, bHeight);

  // create player
    image(hero, p1X, p1Y, pWidth, pHeight);

  // create hearts
    // hearts
    image(heart, h1X, h1Y, hWidth, hHeight);
    // if on hearts
    if(p1X >= h1X - hWidth / 2 && p1X <= h1X + hWidth / 2 && p1Y >= h1Y - hHeight / 2 && p1Y <= h1Y + hHeight / 2){ // this is the code that makes the player collect the hearts
    h1X = random(margin, windowWidth - margin); // this is the code that makes the hearts move to a different random location on the screen
    h1Y = random(margin, windowHeight - margin);
    score = score + 1; // this is the code that adds to the score
  } // end if on heart 1

  // heart 2
    image(heart, h2X, h2Y, hWidth, hHeight);
    // if on heart 2
    if(p1X >= h2X - hWidth / 2 && p1X <= h2X + hWidth / 2 && p1Y >= h1Y - hHeight / 2 && p1Y <= h2Y + hHeight / 2){
    h2X = random(margin, windowWidth - margin);
    h2Y = random(margin, windowHeight - margin);
    score = score + 1;
  } // end if on heart 2

  // heart 3
    image(heart, h3X, h3Y, hWidth, hHeight);
    // if on heart 3
    if(p1X >= h3X - hWidth / 2 && p1X <= h3X + hWidth / 2 && p1Y >= h3Y - hHeight / 2 && p1Y <= h3Y + hHeight / 2){ 
    h3X = random(margin, windowWidth - margin);
    h3Y = random(margin, windowHeight - margin);
    score = score + 1;
  } // end if on heart 3

  // ghoulkings
    // ghoulking 1
    image(ghoulking, g1X, g1Y, gWidth, gHeight);
    if(p1X >= g1X - gWidth / 2 && p1X <= g1X + gWidth / 2 && p1Y >= g1Y - gHeight / 2 && p1Y <= g1Y + gHeight / 2){ // this is the code that makes the player collide with the ghoulking
      lives = lives - 1; // this is the code that subtracts from the lives
      lifeSound.play();
      p1X = window.innerWidth * 0.3 // put the player back to the start position
      p1Y = window.innerHeight * 0.8
    } // end if on ghoulking 1

    // ghoulking 2
    image(ghoulking, g2X, g2Y, gWidth, gHeight);
    if(p1X >= g2X - gWidth / 2 && p1X <= g2X + gWidth / 2 && p1Y >= g2Y - gHeight / 2 && p1Y <= g2Y + gHeight / 2){ // this is the code that makes the player collide with the ghoulking
      lives = lives - 1; // this is the code that subtracts from the lives
      lifeSound.play();
      p1X = window.innerWidth * 0.3 // put the player back to the start position
      p1Y = window.innerHeight * 0.8
    } // end if on ghoulking 3

    // ghoulking 3
    image(ghoulking, g3X, g3Y, gWidth, gHeight);
    if(p1X >= g3X - gWidth / 2 && p1X <= g3X + gWidth / 2 && p1Y >= g3Y - gHeight / 2 && p1Y <= g3Y + gHeight / 2){ // this is the code that makes the player collide with the ghoulking
      lives = lives - 1; // this is the code that subtracts from the lives
      lifeSound.play();
      p1X = window.innerWidth * 0.3 // put the player back to the start position
      p1Y = window.innerHeight * 0.8
    } // end if on ghoulking 3
  
  // scoreboard
    textFont(tbhFont); // change the font to something more fun?
    fill(color);
    stroke(color2);
    strokeWeight(10);
    textSize(fontSize);
    text('MENDED HEARTS:', x1, y);
    text(score + '/15', x2, y); // this is the score counter; can I make it so that the score counter says "score out of 10" or something like that?

  // lives
    textFont(tbhFont); // change the font to something more fun?
    fill(color);
    stroke(color2);
    strokeWeight(10);
    textSize(fontSize);
    text('LIVES:', x1 * 6.7, y);
    text(lives, x2 * 3.3, y); // this is the score counter; can I make it so that the score counter says "score out of 10" or something like that?


 // collisions with platforms
    // if on box 1
    if (p1Y + pHeight / 2 >= b1Y - bHeight / 2 && p1Y - pHeight / 2 <= b1Y + bHeight / 2 && p1X >= b1X - bWidth / 2 && p1X <= b1X + bWidth / 2) { // this is the code that makes the player land on the box platforms and not fall through them
      p1Y = b1Y - bHeight / 2 - pHeight / 2; // adjust player position
      velocity = 0; // stop player from falling through box platform
      jumpCounter = 0; //this is the code that makes the player jump again after landing on a box platform. It's not working though :( (?)
      } // end if on box
  
      // if on box 2
      if (p1Y + pHeight / 2 >= b2Y - bHeight / 2 && p1Y - pHeight / 2 <= b2Y + bHeight / 2 && p1X >= b2X - bWidth / 2 && p1X <= b2X + bWidth / 2) {
      p1Y = b2Y - bHeight / 2 - pHeight / 2; // adjust player position
      velocity = 0;
      jumpCounter = 0;
      } // end if on box
        
      // if on box 3
      if (p1Y + pHeight / 2 >= b3Y - bHeight / 2 && p1Y - pHeight / 2 <= b3Y + bHeight / 2 && p1X >= b3X - bWidth / 2 && p1X <= b3X + bWidth / 2) {
      p1Y = b3Y - bHeight / 2 - pHeight / 2; // adjust player position
      velocity = 0;
      jumpCounter = 0;
      } // end if on box

  // collisions with walls
    if (p1X < pWidth / 2) { // if player 1 goes past left boundary of canvas
    p1X = pWidth / 2; // set player 1 x coordinate to the left boundary of canvas
  }

  if (p1X > window.innerWidth - pWidth / 2) { // if player 1 goes past right boundary of canvas
  p1X = window.innerWidth - pWidth / 2; // set player 1 x coordinate to the right boundary of canvas
}

} // end game function


//// trigger screens ////////////////////////////////////////////
  if(score >= 15){
    stage = 2 // win screen
  } // end win screen

  if(lives <= 0){
    stage = 3
     // lose screen
  } // end lose screen



//// win and lose ////////////////////////////////////////////
//// win
function winScreen() {
  image(landscape, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);
  textSize(fontSize * 4);
  textFont(tbhFont);
  stroke(147, 113, 43);
  strokeWeight(10);
  if (frameCount % 60 < 30) { // alternate fill color every 30 frames
    fill(129, 147, 43);
  } else {
    fill(255); // set fill color to white
  }
  text('YOU WIN!!!', xTitle, yTitle);

  // thanks fort playing
  textSize(fontSize * 2);
  textFont(tbhFont);
  stroke(147, 113, 43);
  strokeWeight(10);
  if (frameCount % 60 < 30) { // alternate fill color every 30 frames
    fill(129, 147, 43);
  } else {
    fill(255); // set fill color to white
  }
  text('THANKS FOR MENDING MY HEART! :)', xTitle, yTitle * 1.5);
}

//// lose
function loseScreen() {
  image(landscape, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);
  textSize(fontSize * 4);
  textFont(tbhFont);
  stroke(147, 113, 43);
  strokeWeight(10);
  if (frameCount % 60 < 30) { // alternate fill color every 30 frames
    fill(129, 147, 43);
  } else {
    fill(255); // set fill color to white
  }
  text('YOU LOSE :(', xTitle, yTitle);

  // try again
  textSize(fontSize * 2);
  textFont(tbhFont);
  stroke(147, 113, 43);
  strokeWeight(10);
  if (frameCount % 60 < 30) { // alternate fill color every 30 frames
    fill(129, 147, 43);
  } else {
    fill(255); // set fill color to white
  }
  text('TRY AGAIN', xTitle, yTitle * 1.5);
}


//// mouse click ////////////////////////////////////////////
function mouseClicked() {
  if (stage === 0 || stage === 2) { // if on start screen or win screen
    stage = 1;
    lives = 3;
    score = 0; // go to stage 1 when mouse is clicked and return lives and score to original values

  } else if( stage === 3) { // if on lose screen
    stage = 0;
    lives = 3;
    score = 0;
    h1X = window.innerWidth * 0.75; // h1 = heart 1
    h1Y = window.innerHeight * 0.2;
    h2X = window.innerWidth * 0.45; // heart 2
    h2Y = window.innerHeight * 0.5;
    h3X = window.innerWidth * 0.15; // heart 3
    h3Y = window.innerHeight * 0.1;
     // go to stage 0 when mouse is clicked and return lives and score to original values
  }
}


function playLoseSound() {
  loseSound.loop = true;
  loseSound.play();
  setTimeout(() => {loseSound.pause();}, 1000);

}


//// draw //////////////////////////////////////////// 
function draw() { // this is the draw function that will be called in the setup function above
// call functions
  keyPressed(); // this is to make sure the player can't jump infinitely (mine seems to be broken tho? will continue to investigate)
  gravity(); // this is the gravity function that will be called in the draw function below
  keyTyped(); // this is the keyTyped function that will be called in the draw function below
  moveGhoulking(g1X, g1Y);
  moveGhoulking(g2X, g2Y);
  moveGhoulking(g3X, g3Y);

  if(stage == 0){ // if stage is 0
    splash(); // call game function
  } // end if stage 0

  if(stage == 1){ // if stage is 1
    game(); // call game function
  } // end if stage 1

  if(stage == 2){ // if stage is 2
    winScreen(); // call game function
  } // end if stage 2

  if(stage == 3){ // if stage is 3
    loseScreen()
    playLoseSound() // call game function
  } // end if stage 3

  //// trigger screens ////////////////////////////////////////////
  if(score >= 15){
  stage = 2 // win screen
  } // end win screen

  if(lives <= 0){
  stage = 3 // lose screen
} // end lose screen

} // end draw functionw


//// gravity //////////////////////////////////////////// 
function gravity() {
  if (p1Y >= minHeight && jump == false) {
    p1Y = p1Y;
  } else {
    p1Y = p1Y + (direction * velocity);
    console.log('jumpCounter:', jumpCounter); // log jumpCounter value
    if (p1Y >= minHeight) {
      jumpCounter = 0; // reset jumpCounter when player hits the ground
    }
  }

  if (jump == true) {
    if (p1Y <= maxHeight || jumpCounter >= jumpPower) {
      velocity = fallingSpeed;
    } else {
      velocity = -jumpPower;
      jumpCounter = jumpCounter + 1;
      console.log('jumpCounter:', jumpCounter); // log jumpCounter value
    }
  } else {
    velocity = fallingSpeed;
  }
}


//// movement and key inputs ////////////////////////////////////////////
function keyPressed() { // this is the keyReleased function that will be called in the setup function above 
  if(kb.pressing('left')){ // if left arrow or a is pressed
    p1X = p1X - 10; // move left
  } //close move left

  if(kb.pressing('right')){ // if right arrow or d is pressed
    p1X = p1X + 10; //move right 
  } //close move right
  

} // end keyPressed function


//// keyTyped
function keyTyped(){ // this is the keyTyped function that will be called in the setup function above 
if(kb.pressing('up')){ // if up arrow or w is pressed
  if(jumpCounter < 30) { // if jumpCounter is less than 2}
    jump = true; // jump
    jumpCounter++; // add 1 to jumpCounter every time the player jumps
    console.log('jumpCounter:', jumpCounter); // log jumpCounter value
} // close jump
}
else { // if up arrow or w is not pressed
  jump = false; // don't jump
} // close don't jump


} // end keyTyped function


//// preload and event listeners ////////////////////////////////////////////
function preload(){
  hero = loadImage('images/hero.png');
  platform = loadImage('images/platform.png');
  landscape = loadImage('images/landscape.png'); 
  jumpSound = loadSound('sounds/jump.mp3');
  heart = loadImage('images/heart.png');
  tbhFont = loadFont('fonts/tbh.TTF');
  ghoulking = loadImage('images/ghoulking.png');
  lifeSound = loadSound('sounds/life.mp3');
  introSong = loadSound('sounds/intro.mp3'); // credit to nene on OpenGameArt.org for the song
  loseSound = loadSound('sounds/lose.mp3');
  
} // end preload

document.addEventListener('keydown', function(event) {
  if ((event.key === 'w' || event.key === 'ArrowUp') && !jump) {
    const currentTime = Date.now(); // get the current time in milliseconds
    const timeSinceLastJumpSound = currentTime - lastJumpSoundTime; // calculate the time since the last jump sound was played

    if (timeSinceLastJumpSound > 500) { // check if more than 1 second has passed since the last jump sound was played
      jump = true; // set jump to true to start jumping
      velocity = -jumpPower; // set initial jump velocity
      jumpSound.play(); // play jump sound
      lastJumpSoundTime = currentTime; // update the lastJumpSoundTime variable to the current time
    }
  }
});
