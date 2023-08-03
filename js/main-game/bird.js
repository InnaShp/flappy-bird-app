class Bird {
  constructor(imgSrc) {
    this.birdEl = document.querySelector('.game__bird');
    this.img = document.getElementById('bird-1');
    this.imgSrcUp = imgSrc;
    this.imgSrcDown = imgSrc.replace('up', 'down');
    this.rect  = this.birdEl.getBoundingClientRect();
    this.velocityY = 0;
    this.gravity = 0.5;
    this.element = document.querySelector('.game-wrapper');
  }
  flapWings() {
    this.img.src = this.imgSrcDown;
  }
  stopFlappingWings() {
    this.img.src = this.imgSrcUp;
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

