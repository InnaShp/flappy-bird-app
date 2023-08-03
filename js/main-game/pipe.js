class Pipe {
  constructor() {
    this.gap = 35;
    this.separation = 0; //змінна для керування частоти появи труб
  }
  createPipeSprite(element, position) { //створює труби відносно заданої позиції
    element.className = 'game__pipeSprite';
    element.style.top = position - 70 + 'vh';
    element.style.left = '100vw';
  }
  setPipeSpriteProperties(element, position) { //налаштовує властивості труби, відстань між ними
    element.className = 'game__pipeSprite';
    element.style.top = position + this.gap + 'vh';
    element.style.left = '100vw';
    element.increaseScore = '1';
  }
}
export default Pipe;