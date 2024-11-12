import Game from './Game.js';

const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas?.getContext('2d');

const game = new Game();

let lastTime = 0;

function gameLoop(timestamp) {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

if (ctx) {
  requestAnimationFrame(gameLoop);
} else {
  console.error('Canvas not supported.');
}
