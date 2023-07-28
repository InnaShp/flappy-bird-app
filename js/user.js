class User {
  constructor(name) {
    this.name = name;
    this.loadFromLocalStorage();
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
  getTopPlayers() {
    let allScores = [];
    for (const user of Object.values(localStorage)) {
      try {
        const userData = JSON.parse(user);
        if (userData && userData.name && Array.isArray(userData.allTimeScores)) {
          allScores.push(...userData.allTimeScores.map((record) => ({ name: userData.name, score: record.score })));
        }
      } catch (error) { }
    }
    const sortedScores = allScores.sort((a, b) => b.score - a.score);
    const top10Scores = sortedScores.slice(0, 10);
    return top10Scores;
  }
  saveToLocalStorage() {
    let userData = JSON.parse(localStorage.getItem(this.name)) || { name: this.name, allTimeScores: [], scoresWithin24Hours: [] };
    userData.allTimeScores = this.allTimeScores;
    userData.scoresWithin24Hours = this.scoresWithin24Hours;
    localStorage.setItem(this.name, JSON.stringify(userData));
  }
  loadFromLocalStorage() {
    let userData = JSON.parse(localStorage.getItem(this.name)) || { name: this.name, allTimeScores: [], scoresWithin24Hours: [] };
    this.allTimeScores = userData.allTimeScores;
    this.scoresWithin24Hours = userData.scoresWithin24Hours;
  }
}
export default User;