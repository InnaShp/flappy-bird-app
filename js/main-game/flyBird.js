import { handleGameOver } from './move.js';

export function flyBird(data) {
  data.bird.updateBirdPosition();
  function handleKeyEvent(e) {
    if ((e.key === 'ArrowUp' || e.key === ' ') && data.gameStatus === 'Play') {
      data.soundFlap.play();
      if (e.type === 'keydown') {
        data.bird.flapWings();
        data.bird.velocityY = -10;
        data.bird.gravity = 0.5;
      } else if (e.type === 'keyup') {
        data.bird.stopFlappingWings();
      }
    }
  }
  function handleTouch() {
    if (document.activeElement.tagName.toLowerCase() !== 'input') {
      if (data.gameStatus === 'Play') {
        data.soundFlap.play();
        data.bird.flapWings();
        data.bird.velocityY = -10;
        data.bird.gravity = 0.5;
      }
    }
  }
  function handleTouchEnd() {
    if (data.gameStatus === 'Play') data.bird.stopFlappingWings();
  }
  
  document.removeEventListener('keydown', handleKeyEvent);
  document.removeEventListener('keyup', handleKeyEvent);

  if (data.gameStatus === 'Play') {
    if (window.innerWidth > 1000) {
      document.addEventListener('keydown', handleKeyEvent);
      document.addEventListener('keyup', handleKeyEvent);
    } else {
      document.addEventListener('touchstart', handleTouch);
      document.addEventListener('touchend', handleTouchEnd);
    }
  }
  if (data.bird.rect.top <= 0 || data.bird.rect.bottom >= data.background.bottom) {
    if (data.gameStatus === 'Play') data.soundDie.play();
    data.gameStatus = 'End';
    data.message.innerHTML = '<img src="../images/game-over.png" alt="Game over"><a href="#" id="restart">Click to restart</a>';
    data.bird.stopFlying();
    const restart = document.getElementById('restart');
    restart.addEventListener('click', () => window.location.reload());
  }
  if (data.gameStatus === 'End' && data.scoreValue.innerHTML > 0 && !data.isCollision) handleGameOver(data);
}