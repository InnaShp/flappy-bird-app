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

  getTop10Scores() {
    const scoresWithUsername = this.allTimeScores.filter((record) => record.hasOwnProperty('score'));
    const sortedScores = scoresWithUsername.sort((a, b) => b.score - a.score);
    console.log(sortedScores.slice(0, 10));
    return sortedScores.slice(0, 10);
  }
  
  getTop10ScoresWithin24Hours() {
    const scoresWithUsernameWithin24Hours = this.scoresWithin24Hours.filter((record) => record.hasOwnProperty('score'));
    const sortedScoresWithin24Hours = scoresWithUsernameWithin24Hours.sort((a, b) => b.score - a.score);
    return sortedScoresWithin24Hours.slice(0, 10);
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


