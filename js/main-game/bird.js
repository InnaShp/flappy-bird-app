class Bird {
  constructor(imgSrc) {
    this.birdEl = document.querySelector('.game__bird');
    this.img = document.getElementById('bird-1');
    this.imgSrcUp = imgSrc;
    this.imgSrcDown = imgSrc.replace('up', 'down');
    this.rect  = this.birdEl.getBoundingClientRect();
    this.velocityY = 0; //початкова швидкість по вертикалі для відстеження зміни вертикальної швидкості обʼєкта 
    this.gravity = 0;
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
  updateBirdPosition() { //оновлення позицій пташки з кожним кадром анімації
    this.velocityY += this.gravity; //спуск пташки вниз через гравітацію
    this.birdEl.style.top = this.rect.top + this.velocityY + 'px'; //оновлює позицію відносно швидкості руху
    this.rect = this.birdEl.getBoundingClientRect(); //оновлює обʼєкт що містить дані про розташування пташки
  }
}
export default Bird;

