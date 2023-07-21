import Bird from './bird.js';
import Pipe from './pipe.js';
const bird = new Bird();
const pipe = new Pipe();
const background = document.querySelector('.background').getBoundingClientRect();
const scoreValue = document.querySelector('.score-val');
const message = document.querySelector('.message');
const scoreTitle = document.querySelector('.score-title');
const moveSpeed = 3;
let gameStatus = 'Start';

bird.stopFlying();
message.classList.add('messageStyle');

document.addEventListener('keydown', (e) => {
  if (e.key == 'Enter' && gameStatus != 'Play') {
    document.querySelectorAll('.pipeSprite').forEach((e) => {
      e.remove();
    });
    bird.startFlying();
    gameStatus = 'Play';
    message.innerHTML = '';
    scoreTitle.innerHTML = 'Score : ';
    scoreValue.innerHTML = '0';
    message.classList.remove('messageStyle');
    play();
  }
});

function play() {
  function move() {
    if (gameStatus != 'Play') return;
    const pipeSprite = document.querySelectorAll('.pipeSprite');
    pipeSprite.forEach((element) => {
      const pipeSpriteProps = element.getBoundingClientRect();
      const birdProps = bird.birdRect;
      if (pipeSpriteProps.right <= 0) {
        element.remove();
      } else {
        if (birdProps.left < pipeSpriteProps.left + pipeSpriteProps.width
          && birdProps.left + birdProps.width > pipeSpriteProps.left
          && birdProps.top < pipeSpriteProps.top + pipeSpriteProps.height
          && birdProps.top + birdProps.height > pipeSpriteProps.top) {
          gameStatus = 'End';
          message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Press Enter To Restart';
          message.classList.add('messageStyle');
          bird.stopFlying();
          return;
        } else {
          if (pipeSpriteProps.right < birdProps.left
            && pipeSpriteProps.right + moveSpeed >= birdProps.left
            && element.increaseScore == '1') {
            scoreValue.innerHTML = + scoreValue.innerHTML + 1;
          }
          element.style.left = pipeSpriteProps.left - moveSpeed + 'px';
        }
      }
    });
    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);

  function applyGravity() {
    if (gameStatus != 'Play') return;
    bird.birdVelocityY += bird.gravity;
    document.addEventListener('keydown', (e) => {
      if (e.key == 'ArrowUp' || e.key == ' ') {
        bird.flapWings();
        bird.birdVelocityY = -10;
      }
    });
    document.addEventListener('keyup', (e) => {
      if (e.key == 'ArrowUp' || e.key == ' ') {
        bird.stopFlappingWings();
      }
    });
    bird.bird.style.top = bird.birdRect.top + bird.birdVelocityY + 'px';
    bird.birdRect = bird.bird.getBoundingClientRect();
    if (bird.birdRect.top <= 0 || bird.birdRect.bottom >= background.bottom) {
      gameStatus = 'End';
      message.style.left = '28vw';
      window.location.reload();
      message.classList.remove('messageStyle');
      return;
    }
    requestAnimationFrame(applyGravity);
  }
  requestAnimationFrame(applyGravity);

  function createPipe() {
    if (gameStatus != 'Play') return;
    if (pipe.separation > 115) {
      pipe.separation = 0;
      const pipePosition = Math.floor(Math.random() * 43) + 8;
      const pipeSpriteUp = document.createElement('div');
      const pipeSprite = document.createElement('div');
      pipe.createPipeSprite(pipeSpriteUp, pipePosition);
      pipe.setPipeSpriteProperties(pipeSprite, pipePosition);
      document.body.appendChild(pipeSpriteUp);
      document.body.appendChild(pipeSprite);
    }
    pipe.separation++;
    requestAnimationFrame(createPipe);
  }
  requestAnimationFrame(createPipe);
}
