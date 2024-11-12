const GRAVITY = 0.5;

export default class Player {
  constructor() {
    this.width = 20;
    this.height = 40;
    this.positionX = 40;
    this.positionY = gameCanvas.height - this.height;
    this.velocityY = 1;
    this.isJumping = false;
  }

  draw(ctx) {
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
