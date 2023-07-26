class User {
  constructor(name) {
    this.name = name;
    this.allTimeScores = [];
    this.scoresWithin24Hours = [];
  }

  setScore(score) {
    this.allTimeScores.push({ score, time: Date.now() });
    this.removeOldScores();
    this.scoresWithin24Hours = this.allTimeScores.filter(
      (record) => Date.now() - record.time <= 24 * 60 * 60 * 1000
    );
    this.saveToLocalStorage();
  }

  removeOldScores() {
    const currentTime = Date.now();
    const twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000;
    this.allTimeScores = this.allTimeScores.filter(
      (record) => record.time >= twentyFourHoursAgo
    );
  }

  getBestScore() {
    const scoresWithScore = this.allTimeScores.filter((record) => record.hasOwnProperty('score'));
    if (scoresWithScore.length === 0) {
      return 0;
    }
    return Math.max(...scoresWithScore.map((record) => record.score));
  }

  getBestScoreWithin24Hours() {
    const scoresWithScoreWithin24Hours = this.scoresWithin24Hours.filter((record) => record.hasOwnProperty('score'));
    if (scoresWithScoreWithin24Hours.length === 0) {
      return 0;
    }
    return Math.max(...scoresWithScoreWithin24Hours.map((record) => record.score));
  }


  saveToLocalStorage() {
    const data = {
      allTimeScores: this.allTimeScores,
      scoresWithin24Hours: this.scoresWithin24Hours,
    };
    localStorage.setItem(this.name, JSON.stringify(data));
  }

  loadFromLocalStorage() {
    const data = localStorage.getItem(this.name);
    if (data) {
      const parsedData = JSON.parse(data);
      this.allTimeScores = parsedData.allTimeScores || [];
      this.scoresWithin24Hours = parsedData.scoresWithin24Hours || [];
    }
  }
}

export default User;


