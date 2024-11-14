import Player from './Player.js';
import Obstacle from './Obstacle.js';
import ScoreTracker from './ScoreTracker.js';
import { FINAL_SCORE } from './constants.js';

const OBSTACLE_MIN_INTERVAL = 500;
const OBSTACLE_MAX_INTERVAL = 2000;

export default class Game {
  constructor() {
    this.scoreTracker = new ScoreTracker();
    this.initGame();
    this.ouchSound = new Audio('./assets/sound/ouch-sound.mp3');

    document.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        if (!this.isGameRunning && !this.isGameOver && this.canRestart) {
          this.isGameRunning = true;
        } else if (this.isGameOver && this.canRestart) {
          this.initGame();
          this.isGameRunning = true;
        }

        if (this.isGameRunning) {
          this.player.jump();
        }
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
    this.countdown = 3;
    this.canRestart = true;
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

    if (this.isGameOver && this.scoreTracker.score < FINAL_SCORE) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      ctx.font = '48px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over', ctx.canvas.width / 2, ctx.canvas.height / 2);

      this.drawCountdown(ctx);
    }

    if (this.scoreTracker.score >= FINAL_SCORE) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      ctx.font = '48px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText('You win!', ctx.canvas.width / 2, ctx.canvas.height / 2);

      ctx.font = '24px Arial';
      ctx.fillText(
        'Thank you for playing the game!',
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

      if (this.scoreTracker.score >= FINAL_SCORE) {
        this.isGameRunning = false;
        this.isGameOver = true;
        this.canRestart = false;
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
        this.canRestart = false;
        this.isGameOver = true;
        this.isGameRunning = false;

        this.ouchSound.currentTime = 0;
        this.ouchSound.play();

        this.scoreTracker.saveHighscore();

        this.startCountdown();
      }
    });
  }

  drawCountdown(ctx) {
    ctx.font = '24px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(
      this.countdown > 0 ? this.countdown : 'Press SPACE to restart the game',
      ctx.canvas.width / 2,
      ctx.canvas.height / 2 + 30
    );
  }

  startCountdown() {
    this.countdown = 3;

    const interval = setInterval(() => {
      this.countdown -= 1;

      if (this.countdown <= 0) {
        clearInterval(interval);
        this.canRestart = true;
      }
    }, 1000);
  }
}
