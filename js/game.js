import Bird from './bird.js';
import Pipe from './pipe.js';
import User from './user.js';
import { checkBirdPipeCollision } from './move.js';
import { flyBird } from './flyBird.js';
import { updatePipes } from './updatePipes.js';

const header = document.querySelector('.header');
const form = document.getElementById('name-form');
const nameInput = document.querySelector('.form__user-name-input');

const gameData = {
  bird: new Bird(localStorage.selectedBird),
  pipe: new Pipe(),
  user: null,
  isCollision: false,
  background: document.querySelector('.game__background').getBoundingClientRect(),
  scoreValue: document.querySelector('.game__score-val'),
  scoreTitle: document.querySelector('.game__score-title'),
  message: document.querySelector('.game__message'),
  gameStatus: 'Start',
  moveSpeed: 3,
  currentScore: null,
  soundDie: new Audio('sounds/die.mp3'),
  soundPoint: new Audio('sounds/point.mp3'),
  soundFlap: new Audio('sounds/flap.mp3'),
  soundHitPipe: new Audio('sounds/hit-pipe.mp3'),
}

function startGame() {
  gameData.bird.stopFlying();
  header.classList.toggle('fixed');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const userName = nameInput.value;
    gameData.user = new User(userName);
    gameData.user.loadFromLocalStorage();
    handleStartGame();
  });
}
startGame();
function handleStartGame() {
  if (gameData.gameStatus != 'Play') {
    document.querySelectorAll('.game__pipeSprite').forEach((e) => e.remove());
    gameData.bird.startFlying();
    gameData.bird.flapWings()
    gameData.gameStatus = 'Play';
    gameData.message.innerHTML = '';
    gameData.scoreTitle.innerHTML = 'Score : ';
    gameData.scoreValue.innerHTML = '0';
    requestAnimationFrame(gameLoop);
  }
}
function gameLoop() {
  if (gameData.gameStatus === 'Play') {
    checkBirdPipeCollision(gameData);
    flyBird(gameData);
    updatePipes(gameData);
    requestAnimationFrame(gameLoop);
  }
}

