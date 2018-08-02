var yOptions = [60, 140, 220];
var speedOptions = [100, 140, 160, 200, 250];

// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  // to start off the map
  this.x = -100;
  this.y = yOptions[random(yOptions)];
  this.speed = speedOptions[random(speedOptions)];
};

var random = function(arr) {
  return Math.floor(Math.random() * arr.length);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  var yPlayer = player.y;
  var xPlayer = player.x;
  var yEnemy = this.y;
  var xEnemy = this.x;
  this.x += this.speed * dt;

  if (yPlayer - yEnemy === 0) {
    if (xPlayer - xEnemy > -60 && xPlayer - xEnemy <= 60) {
      player.reset();
    }
  }

  if (yPlayer < 0) {
    player.reset();
  }

  if (this.x > 500) {
    this.x = -100;
    this.y = yOptions[random(yOptions)];
    this.speed = speedOptions[random(speedOptions)];
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var playerOptions = [
  'images/char-boy.png',
  'images/char-cat-girl.png',
  'images/char-horn-girl.png',
  'images/char-pink-girl.png',
  'images/char-princess-girl.png'
];

var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 200;
  this.y = 380;
};

Player.prototype.reset = function() {
  this.sprite = playerOptions[random(playerOptions)].toString();
  this.x = 200;
  this.y = 380;
};

Player.prototype.update = function() {
  if (player.y < 0) {
    player.reset();
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(dir) {
  var x = this.x;
  var y = this.y;
  switch (dir) {
    case 'left':
      if (x - 100 > 0) {
        this.x -= 100;
      }
      break;
    case 'up':
      this.y -= 80;
      break;
    case 'right':
      if (x + 100 < 500) {
        this.x += 100;
      }
      break;
    case 'down':
      if (y + 80 < 400) {
        this.y += 80;
      }
      break;
    default:
      break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemyOne = new Enemy();
var enemyTwo = new Enemy();
var enemyThree = new Enemy();
var allEnemies = [enemyOne, enemyTwo, enemyThree];
var player = new Player();

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
