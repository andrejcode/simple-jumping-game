export default class Obstacle {
  constructor() {
    this.width = 20;
    this.height = 30;
    this.positionX = gameCanvas.width;
    this.positionY = gameCanvas.height - this.height;
    this.speed = 5;
  }

  draw(ctx) {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
  }

  update() {
    this.positionX -= this.speed;
  }
}
