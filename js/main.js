const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas?.getContext('2d');

const GRAVITY = 0.5;

class Player {
  constructor() {
    this.width = 20;
    this.height = 40;
    this.positionX = 40;
    this.positionY = gameCanvas.height - this.height;
    this.velocityY = 1;
    this.isJumping = false;
  }

  draw() {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
  }

  update() {
    this.positionY += this.velocityY;

    if (this.positionY + this.height + this.velocityY <= gameCanvas.height) {
      this.isJumping = true;
      this.velocityY += GRAVITY;
    } else {
      this.isJumping = false;
      this.velocityY = 0;
    }
  }

  jump() {
    if (!this.isJumping) {
      this.velocityY = -10;
    }
  }
}

const player = new Player();

window.addEventListener('keydown', (e) => {
  if (e.key === ' ') {
    player.jump();
  }
});

function gameLoop() {
  window.requestAnimationFrame(gameLoop);

  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  player.update();
  player.draw();
}

if (ctx) {
  gameLoop();
} else {
  console.error('Canvas not supported.');
}
