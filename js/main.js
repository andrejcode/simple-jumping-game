import Player from './Player.js';
import Obstacle from './Obstacle.js';

const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas?.getContext('2d');

const obstacle = new Obstacle();
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
  player.draw(ctx);

  obstacle.update();
  obstacle.draw(ctx);
}

if (ctx) {
  gameLoop();
} else {
  console.error('Canvas not supported.');
}
