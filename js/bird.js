class Bird {
  constructor() {
    this.bird = document.querySelector('.bird');
    this.birdImg = document.getElementById('bird-1');
    this.birdRect  = this.bird.getBoundingClientRect();
    this.birdVelocityY = 0;
    this.gravity = 0.5;
  }
  flapWings() {
    this.birdImg.src = '../images/flappy-bird-down.png';
  }
  stopFlappingWings() {
    this.birdImg.src = '../images/flappy-bird-up.png';
  }
  startFlying() {
    this.birdImg.style.display = 'block';
    this.bird.style.top = '40vh';
  }
  stopFlying() {
    this.birdImg.style.display = 'none'; 
  }
}
export default Bird;