class Pipe {
  constructor() {
    this.gap = 35;
    this.separation = 0;
  }
  createPipeSprite(element, position) {
    element.className = 'game__pipeSprite';
    element.style.top = position - 70 + 'vh';
    element.style.left = '100vw';
  }
  setPipeSpriteProperties(element, position) {
    element.className = 'game__pipeSprite';
    element.style.top = position + this.gap + 'vh';
    element.style.left = '100vw';
    element.increaseScore = '1';
  }
}
export default Pipe;