const PLAYER_START_POSITION_X = 200;
const PLAYER_START_POSITION_Y = 305;
// Moving left/right === 100
const X_STEP = 100;
// Moving up/down === ~82
const Y_STEP = 82;

class Character {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 80;
  }

  update (dt) {
  }

  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Enemies our player must avoid
class Enemy extends Character {
  constructor (x, y, speed) {
    super(x, y);
    this.speed = speed

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.startX = x;
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update (dt) {
    super.update(dt);
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = (this.x + this.speed * dt) % 500;
    detectCollision(this, player);
  }

  // Draw the enemy on the screen, required method for game
  render () {
    super.render();
  }

  reset () {
    this.x = this.startX;
    this.speed = randomSpeed(100, 300);
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player extends Character {
  constructor (x, y) {
    super(x, y);
    this.sprite = 'images/char-boy.png';
  }

  update (dt) {
    super.update(dt);
  }

  render () {
    super.render();
  }

  handleInput (keyCode) {
    switch (keyCode) {
      case 'up':
        if ((this.y - Y_STEP) < -28) {
          // reached the water, you win!
        } else {
          this.y = this.y - Y_STEP;
        }

        checkWin();

        break;
      case 'down':
        // y-value of 400 is the bottom row
        if (this.y + Y_STEP > 400) {
          // noop, stay at the bottom
        } else {
          this.y = this.y + Y_STEP;
        }

        break;
      case 'left':
        // x-value of 0 is the left edge
        if (this.x - X_STEP < 0) {
          // noop, stay at the left edge
        } else {
          this.x = this.x - X_STEP;
        }

        break;
      case 'right':
        // x-value of 500 is the right edge
        if (this.x + X_STEP >= 500) {
          // noop, stay at the right edge
        } else {
          this.x = this.x + X_STEP;
        }

        break;
      default:
    }
  }

  reset () {
    this.x = PLAYER_START_POSITION_X;
    this.y = PLAYER_START_POSITION_Y;
  }
}

function detectCollision(object1, object2) {
  // collision detection references:
  //   * https://stackoverflow.com/questions/13916966/adding-collision-detection-to-images-drawn-on-canvas
  //   * http://blog.sklambert.com/html5-canvas-game-2d-collision-detection/#d-collision-detection
  //   * https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

  if (object1.x < object2.x + object2.width  &&
      object1.x + object1.width  > object2.x &&
  		object1.y < object2.y + object2.height &&
      object1.y + object1.height > object2.y) {

    // objects collided
    console.log(`collision!  enemy(${object1.x},${object1.y}), player(${object2.x}, ${object2.y})`);
    let c1 = object1.x < object2.x + object2.width;
    let c2 = object1.x + object1.width  > object2.x;
    let c3 = object1.y < object2.y + object2.height;
    let c4 = object1.y + object1.height > object2.y;
    console.log(`object1.x:${object1.x} < object2.x:${object2.x} + object2.width:${object2.width} === ${c1}`);
    console.log(`object1.x:${object1.x} + object1.width:${object1.width} > object2.x:${object2.x} === ${c2}`);
    console.log(`object1.y:${object1.y} < object2.y:${object2.y} + object2.height:${object2.height} === ${c3}`);
    console.log(`object1.y:${object1.y} + object1.height:${object1.height} > object2.y:${object2.y} === ${c4}`);

    youLose();
  } else {
    // no-op, no collision
  }
}

function youLose() {
  player.reset();
  allEnemies.forEach((bug) => bug.reset());
}

function youWin() {
  console.log(`win! player.y = ${player.y}`);
  player.reset();
  allEnemies.forEach((bug) => bug.reset());
  updateScore();
}

function checkWin() {
  // y-value is ~23 when player reaches the water
  if (player.y < -22) {
    youWin();
  }
}

function updateScore() {
  const wins = document.querySelector('#wins');
  gameData.wins = gameData.wins + 1;
  wins.textContent = gameData.wins;
}

function randomSpeed(min, max) {
  let n = Math.floor(Math.random() * max);

  if (n < min) {
    n = min;
  }

  return n
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let bug1 = new Enemy(0, 60, randomSpeed(100, 300));
let bug2 = new Enemy(300, 140, randomSpeed(100, 300));
let bug3 = new Enemy(200, 225, randomSpeed(100,300));
let allEnemies = [bug1, bug2, bug3];
const player = new Player(PLAYER_START_POSITION_X, PLAYER_START_POSITION_Y);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

let musicPlaying = false;

function toggleMusic() {
  const musicIcon = document.querySelector("#button-music-toggle");

  if (musicPlaying) {
    musicPlaying = false;
    myMusic.pause();
    musicIcon.setAttribute('src', "./images/icons8-no-audio-32.png");
    musicIcon.setAttribute('alt', "music off");
  } else {
    musicPlaying = true;
    myMusic.play();
    musicIcon.setAttribute('src', "./images/icons8-sound-32.png");
    musicIcon.setAttribute('alt', "music on");
  }
}

// https://www.w3schools.com/graphics/game_sound.asp
// https://developer.mozilla.org/en-US/docs/Games/Techniques/Audio_for_Web_Games
// http://freemusicarchive.org/music/Kevin_MacLeod/Classical_Sampler/Gymnopedie_No_1
const myMusic = new Audio("music/Kevin_MacLeod_-_Erik_Satie_Gymnopedie_No_1.mp3");
myMusic.loop = true;

const gameData = {
  wins: 0,
  losses: 0,
};

document.querySelector("#button-music-toggle").addEventListener("click", toggleMusic);
