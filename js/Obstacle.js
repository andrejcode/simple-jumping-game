export default class Obstacle {
  constructor() {
    this.width = 20;
    this.height = 30;
    this.positionX = gameCanvas.width;
    this.positionY = gameCanvas.height - this.height;
  }

  draw(ctx) {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
  }

  update(speed) {
    this.positionX -= speed;
  }
}
