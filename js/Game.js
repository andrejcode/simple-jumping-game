import Player from './Player.js';
import Obstacle from './Obstacle.js';
import ScoreTracker from './ScoreTracker.js';

const OBSTACLE_MIN_INTERVAL = 500;
const OBSTACLE_MAX_INTERVAL = 2000;

export default class Game {
  constructor() {
    this.scoreTracker = new ScoreTracker();
    this.initGame();
    this.ouchSound = new Audio('./assets/sound/ouch-sound.mp3');

    document.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        if (!this.isGameRunning && !this.isGameOver) {
          this.isGameRunning = true;
        } else if (this.isGameOver) {
          this.initGame();
          this.isGameRunning = true;
        }

        this.player.jump();
      }
    });
  }

  initGame() {
    this.scoreTracker.reset();
    this.player = new Player();
    this.obstacles = [];
    this.obstacleSpawnTimer = 0;
    this.obstacleInterval = this.generateRandomInterval();
    this.isGameRunning = false;
    this.isGameOver = false;
  }

  generateRandomInterval() {
    return (
      Math.random() * (OBSTACLE_MAX_INTERVAL - OBSTACLE_MIN_INTERVAL) +
      OBSTACLE_MIN_INTERVAL
    );
  }

  draw(ctx) {
    this.scoreTracker.draw(ctx);
    this.player.draw(ctx);
    this.obstacles.forEach((obstacle) => {
      obstacle.draw(ctx);
    });

    if (this.isGameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      ctx.font = '48px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over', ctx.canvas.width / 2, ctx.canvas.height / 2);
      ctx.font = '24px Arial';
      ctx.fillText(
        'Press SPACE to restart the game',
        ctx.canvas.width / 2,
        ctx.canvas.height / 2 + 30
      );
    }
  }

  update(deltaTime) {
    if (this.isGameRunning) {
      this.scoreTracker.update(deltaTime);
      this.player.update();
      this.updateObstacles(deltaTime);
      this.checkCollisions();

      if (this.scoreTracker.score >= 99999) {
        // TODO: Remove console.log after implementing win screen
        console.log('You win!');
        this.isGameRunning = false;
        this.isGameOver = true;
      }
    }
  }

  updateObstacles(deltaTime) {
    this.obstacleSpawnTimer += deltaTime;

    if (this.obstacleSpawnTimer > this.obstacleInterval) {
      this.obstacles.push(new Obstacle());
      this.obstacleSpawnTimer = 0;
      this.obstacleInterval = this.generateRandomInterval();
    }

    this.obstacles = this.obstacles.filter((obstacle) => {
      obstacle.update();
      return obstacle.positionX + obstacle.width > 0;
    });
  }

  checkCollisions() {
    this.obstacles.forEach((obstacle) => {
      if (
        this.player.positionX < obstacle.positionX + obstacle.width &&
        this.player.positionX + this.player.width > obstacle.positionX &&
        this.player.positionX < obstacle.positionY + obstacle.height &&
        this.player.positionY + this.player.height > obstacle.positionY
      ) {
        this.isGameOver = true;
        this.isGameRunning = false;

        this.ouchSound.currentTime = 0;
        this.ouchSound.play();

        this.scoreTracker.saveHighscore();

        // TODO: Remove console.log after implementing game over screen
        console.log('Game Over');
      }
    });
  }
}
