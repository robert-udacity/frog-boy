// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 80;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = (this.x + this.speed * dt) % 500;
    detectCollision(this, player);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

function Player(x, y) {
  this.sprite = 'images/char-boy.png';
  this.x = x;
  this.y = y;
  this.height = 70;
  this.width = 80;
}

Player.prototype.update = function(dt) {
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keyCode) {
  // Moving up/down === ~82
  // Moving left/right === 100
  switch (keyCode) {
    case 'up':
      if ((this.y - 82) < -28) {
        // reached the water, you win!
      } else {
        this.y = this.y - 82;
      }

      break;
    case 'down':
      // y-value of 400 is the bottom row
      if (this.y + 82 > 400) {
        // noop, stay at the bottom
      } else {
        this.y = this.y + 82;
      }

      break;
    case 'left':
      // x-value of 0 is the left edge
      if (this.x - 100 < 0) {
        // noop, stay at the left edge
      } else {
        this.x = this.x - 100;
      }

      break;
    case 'right':
      // x-value of 500 is the right edge
      if (this.x + 100 >= 500) {
        // noop, stay at the right edge
      } else {
        this.x = this.x + 100;
      }

      break;
    default:
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
  } else {
    // no-op, no collision
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const bug1 = new Enemy(0, 60, 80);
const bug2 = new Enemy(0, 140, 40);
const bug3 = new Enemy(0, 225, 140);
const allEnemies = [bug1, bug2, bug3];
const player = new Player(200, 305);

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
