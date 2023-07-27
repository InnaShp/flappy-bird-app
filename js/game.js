import Bird from './bird.js';
import Pipe from './pipe.js';
import User from './user.js';
import { checkBirdPipeCollision } from './move.js';
import { flyBird } from './flyBird.js';
import { updatePipes } from './updatePipes.js';

const header = document.querySelector('.header');

const gameData = {
  bird: new Bird(),
  pipe: new Pipe(),
  user: new User('zlata'),
  background: document.querySelector('.background').getBoundingClientRect(),
  scoreValue: document.querySelector('.score-val'),
  scoreTitle: document.querySelector('.score-title'),
  message: document.querySelector('.message'),
  gameStatus: 'Start',
  moveSpeed: 3,
  currentScore: null,
  soundDie: new Audio('sounds/die.mp3'),
  soundPoint: new Audio('sounds/point.mp3'),
  soundFlap: new Audio('sounds/flap.mp3'),
  soundHitPipe: new Audio('sounds/hit-pipe.mp3'),
};
gameData.user.loadFromLocalStorage();

function startGame() {
  gameData.bird.stopFlying();
  gameData.message.classList.add('messageStyle');
  header.classList.toggle('fixed');

  function handleStartGame(e) {
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
      requestAnimationFrame(gameLoop);
      document.removeEventListener('keydown', handleStartGame);
    }
  }
  
  function handleRestartGame(e) {
    if (e.key == 'Enter' && gameData.gameStatus === 'End') {
      gameData.soundDie.pause();
      document.removeEventListener('keydown', handleRestartGame);
    }
  }
  
  document.addEventListener('keydown', handleStartGame);
  document.addEventListener('keydown', handleRestartGame);

  function gameLoop() {
    if (gameData.gameStatus === 'Play') {
      checkBirdPipeCollision(gameData);
      flyBird(gameData);
      updatePipes(gameData);
      requestAnimationFrame(gameLoop);
    }
  }
}

startGame();
