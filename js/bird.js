class Bird {
  constructor() {
    this.birdEl = document.querySelector('.bird');
    this.img = document.getElementById('bird-1');
    this.rect  = this.birdEl.getBoundingClientRect();
    this.velocityY = 0;
    this.gravity = 0.5;
  }
  flapWings() {
    this.img.src = '../images/flappy-bird-down.png';
  }
  stopFlappingWings() {
    this.img.src = '../images/flappy-bird-up.png';
  }
  startFlying() {
    this.img.style.display = 'block';
    this.birdEl.style.top = '40vh';
  }
  stopFlying() {
    this.img.style.display = 'none'; 
  }
  updateBirdPosition() {
    this.velocityY += this.gravity;
    this.birdEl.style.top = this.rect.top + this.velocityY + 'px';
    this.rect = this.birdEl.getBoundingClientRect();
  }
}
export default Bird;