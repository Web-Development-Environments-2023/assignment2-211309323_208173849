// Get the canvas element and its context
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

// Load the image of the space blazer
var spaceBlazerImg = new Image();
spaceBlazerImg.src = "images/SB1.png";

// Load the image of the enemy
var enemyImg = new Image();
enemyImg.src = "images/SB2.png";
var score = 0;
var shotImg = new Image();
shotImg.src = "images/shot.png";
var x = canvas.width /2;
var y = canvas.height - 40;
var dx = 0;
var dy = 0;
var width = 20;
var height = 20;
var enemyWidth = 20;
var enemyHeight = 20;
var shotWidth=5;
var shotHeight = 10;
var enemies_SB = [];
var shots=[];
var enemyBullets = [];
var gameTime;
var timeLimits=60;
for (var i = 0; i < 20; i++) {
  var line = Math.floor(i / 5);
  var xEnemy = (i % 5) * 100 + 50;
  var yEnemy = line * 60 + 20;
  var dxEnemy = 2;
  var dyEnemy = 0;
  var enemy = { x: xEnemy, y: yEnemy, dx: dxEnemy, dy: dyEnemy, width: enemyWidth, height: enemyHeight };
  enemies_SB.push(enemy);
}


document.addEventListener("keydown", function(event) {
  if (event.code === "ArrowLeft") {
    dx = -2;
  } else if (event.code === "ArrowRight") {
    dx = 2;
  } else if (event.code === "ArrowUp") {
    dy = -2;
  } else if (event.code === "ArrowDown") {
    dy = 2;
  }
});

document.addEventListener("keyup", function(event) {
  if (event.code === "ArrowLeft" || event.code === "ArrowRight") {
    dx = 0;
  } else if (event.code === "ArrowUp" || event.code === "ArrowDown") {
    dy = 0;
  }
});

// Define the bullet object
var bullet = { x: 0, y: 0, width: 5, height: 10, dy: -5, visible: false };

// Load the image of the bullet
var bulletImg = new Image();
bulletImg.src = "images/shot.png";

// Define the function to fire the bullet
function fireBullet() {
  bullet.x = x + width / 2 - bullet.width / 2;
  bullet.y = y;
  bullet.visible = true;
}

// Define the function to move the bullet
function moveBullet() {
  if (bullet.visible) {
    bullet.y += bullet.dy;

    // Check for collision with the enemies
    for (var i = 0; i < enemies_SB.length; i++) {
      var enemy = enemies_SB[i];
      if (bullet.x < enemy.x + enemy.width &&
          bullet.x + bullet.width > enemy.x &&
          bullet.y < enemy.y + enemy.height &&
          bullet.y + bullet.height > enemy.y) {
        // Collision detected, remove the enemy and bullet from the array
        enemies_SB.splice(i, 1);
        bullet.visible = false;
        break;
      }
    }

    // Check if the bullet has hit the top of the canvas
    if (bullet.y < 0) {
      bullet.visible = false;
    }
  }
}

// Define the function to draw the bullet
function drawBullet() {
  if (bullet.visible) {
    context.drawImage(bulletImg, bullet.x, bullet.y, bullet.width, bullet.height);
  }
}

// Add event listener for spacebar to fire the bullet
document.addEventListener("keydown", function(event) {
  if (event.code === "Space") {
    fireBullet();
  }
});
var shotsReceived=0;

function initGame(){
  if (x + dx > canvas.width - width || x + dx < 0) {
    dx = -dx;
  }
  if (y + dy > canvas.height - height || y + dy < canvas.height * 0.6) {
    dy = -dy;
  }
  x += dx;
  y += dy;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(spaceBlazerImg, x, y, width, height);

  for (var i = 0; i < enemies_SB.length; i++) {
    var enemy = enemies_SB[i];

    // Check if the enemy has hit the edges of the canvas
    if (enemy.x + enemy.dx > canvas.width - enemy.width || enemy.x + enemy.dx < 0) {
      enemy.dx = -enemy.dx;
    }

    // Check for collision with the space blazer
    if (x < enemy.x + enemy.width &&
        x + width > enemy.x &&
        y < enemy.y + enemy.height &&
        y + height > enemy.y) {
      // Collision detected, remove the enemy from the array
      enemies_SB.splice(i, 1);
      i--;
      updateScore();
    } else {
      // Update the position of the enemy
      enemy.x += enemy.dx;

      // Draw the enemy image in its new position
      context.drawImage(enemyImg, enemy.x, enemy.y, enemy.width, enemy.height);
    }
  }
  

    moveBullet();
    drawBullet();
    
    // Move and draw the enemy bullets
    for (var i = 0; i < enemyBullets.length; i++) {
      var bullet = enemyBullets[i];
  
      // Update the position of the bullet
      bullet.y += bullet.dy;
  
      // Draw the bullet image in its new position
      context.drawImage(shotImg,bullet.x, bullet.y, bullet.width, bullet.height);
  
  if (x < bullet.x + bullet.width &&
    x + width > bullet.x &&
    y < bullet.y + bullet.height &&
    y + height > bullet.y) {
    shotsReceived++;

    if (shotsReceived >= 3) {
        alert("Game Over! You have been hit " + shotsReceived + " times.");
        document.location.reload();
    }
}
    }
if (Math.random() < 0.04) {
  enemyShot();

}

 
}




function enemyShot() {
  // Choose a random enemy to fire a bullet
  var enemy = enemies_SB[Math.floor(Math.random() * enemies_SB.length)];

  // Create a new bullet object for the enemy
  var bullet = {
    x: enemy.x + enemy.width / 2,
    y: enemy.y + enemy.height,
    width: 2,
    height: 10,
    dy: 5
  };

  // Add the new bullet to the array
  enemyBullets.push(bullet);
}
function startTimer() {
	timeLimits--;
	if (timeLimits == 0 ) {
		timeOut= true;
    message = "Loser!";
    gameOverMus = new Audio('./music/GameOverVoiceSoundEffect.mp3');
    imageOver.src ="./images/loser.png";
    messageWidth =260;
	}
}


function StartGame(){

    $("#homePage").hide();
    $("#loginPage").hide();
    $("#registerPage").hide();
    $("#settingPage").hide();
    $("#myCanvas").show();
    $("#welcome_user").text(`Welcome ${player.username}!`);
    lblTime.value = timeLimits;
    lblScore.value = score;
	lives = 3;
  loseGame = false;
	timeOut = false;
  stop = false;
  timeLimits = gameTime;
 initGame();



startTimer();
  setTimeout(StartGame, 10);   
}


StartGame();
