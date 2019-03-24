// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = 0;
    this.y = 0;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = (this.x + this.speed * dt) % 500;
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
}

Player.prototype.update = function(dt) {
  console.log(`Player: (${this.x}, ${this.y})`);
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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const bug1 = new Enemy(0, 0, 40);
const allEnemies = [bug1];
const player = new Player(200, 300);

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
