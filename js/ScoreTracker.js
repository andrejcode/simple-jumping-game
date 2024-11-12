const HIGHSCORE = 'highscore';

export default class ScoreTracker {
  constructor() {
    this.score = 0;
    this.highscore = this.getHighscore();
  }

  getHighscore() {
    try {
      return localStorage.getItem(HIGHSCORE) || 0;
    } catch {
      console.error('Failed to get highscore');
      return 0;
    }
  }

  saveHighscore() {
    try {
      const storedHighscore = localStorage.getItem(HIGHSCORE);

      if (!storedHighscore || this.score > storedHighscore) {
        localStorage.setItem(HIGHSCORE, this.score);
        this.highscore = this.score;
      }
    } catch {
      console.error('Failed to save highscore');
    }
  }

  draw(ctx) {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    const formattedScore = Math.floor(this.score).toString().padStart(5, '0');
    ctx.fillText(formattedScore, ctx.canvas.width - 70, 30);

    ctx.fillStyle = 'gray';
    const formattedHighscore = Math.floor(this.highscore)
      .toString()
      .padStart(5, '0');
    ctx.fillText(`HI ${formattedHighscore}`, ctx.canvas.width - 170, 30);
  }

  update(deltaTime) {
    console.log(this.score);
    this.score += deltaTime * 0.01;
  }

  reset() {
    this.score = 0;
  }
}
