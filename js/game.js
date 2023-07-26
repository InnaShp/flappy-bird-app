import Bird from './bird.js';
import Pipe from './pipe.js';
import { checkBirdPipeCollision } from './move.js';
import { flyBird } from './flyBird.js';
import { updatePipes } from './updatePipes.js';

const header = document.querySelector('.header');

const gameData = {
  bird: new Bird(),
  pipe: new Pipe(),
  background: document.querySelector('.background').getBoundingClientRect(),
  scoreValue: document.querySelector('.score-val'),
  scoreTitle: document.querySelector('.score-title'),
  message: document.querySelector('.message'),
  gameStatus: 'Start',
  moveSpeed: 3,
  soundDie: new Audio('sounds/die.mp3'),
  soundPoint: new Audio('sounds/point.mp3'),
  soundFlap: new Audio('sounds/flap.mp3'),
  soundHitPipe: new Audio('sounds/hit-pipe.mp3'),
}

function startGame() {
  gameData.bird.stopFlying();
  gameData.message.classList.add('messageStyle');
  header.classList.toggle('fixed');
  document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter' && gameData.gameStatus != 'Play') {
      document.querySelectorAll('.pipeSprite').forEach((e) => {
        e.remove();
      });
      gameData.bird.startFlying();
      gameData.gameStatus = 'Play';
      gameData.message.innerHTML = '';
      gameData.scoreTitle.innerHTML = 'Score : ';
      gameData.scoreValue.innerHTML = '0';
      gameData.message.classList.remove('messageStyle');
      play();
    }
  });

  function play() {
    function gameLoop() {
      if (gameData.gameStatus == 'Play') {
        checkBirdPipeCollision(gameData);
        flyBird(gameData);
        updatePipes(gameData);
        requestAnimationFrame(gameLoop);
      }
    }
    gameLoop();
  }
}
startGame();