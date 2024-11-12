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
    const cappedScore = Math.min(Math.floor(this.score), 99999);
    const formattedScore = cappedScore.toString().padStart(5, '0');
    ctx.fillText(formattedScore, ctx.canvas.width - 70, 30);

    if (this.highscore > 0) {
      ctx.fillStyle = 'gray';
      const cappedHighscoreScore = Math.min(Math.floor(this.highscore), 99999);
      const formattedHighscore = cappedHighscoreScore
        .toString()
        .padStart(5, '0');
      ctx.fillText(`HI ${formattedHighscore}`, ctx.canvas.width - 170, 30);
    }
  }

  update(deltaTime) {
    this.score += deltaTime * 0.01;
  }

  reset() {
    this.score = 0;
  }
}
