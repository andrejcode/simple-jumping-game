import Player from './Player.js';
import Obstacle from './Obstacle.js';

const OBSTACLE_MIN_INTERVAL = 500;
const OBSTACLE_MAX_INTERVAL = 2000;

export default class Game {
  constructor() {
    this.initGame();

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
    this.player.draw(ctx);
    this.obstacles.forEach((obstacle) => {
      obstacle.draw(ctx);
    });
  }

  update(deltaTime) {
    if (this.isGameRunning) {
      this.player.update();
      this.updateObstacles(deltaTime);
      this.checkCollisions();
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

        // TODO: Add Game Over Text
        console.log('Game Over');
      }
    });
  }
}
