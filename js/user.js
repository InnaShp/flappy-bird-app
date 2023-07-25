class User {
  constructor(name) {
    this.name =  name;
    this.scores = [];
  }
  setScore(score) {
    this.scores.push(score);
  }
  getBestScore() {
    return Math.max(...this.scores);
  }
}
export default User;

const user = new User('Inna');
user.setScore(10);
user.setScore(22);
user.setScore(3);
console.log(user.getBestScore());