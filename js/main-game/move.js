let isGameOver = false;
const minPipeGap = 25;

export function checkBirdPipeCollision(data) {
  const pipeSprite = document.querySelectorAll('.game__pipeSprite');
  pipeSprite.forEach((element) => {
    const pipeSpriteProps = element.getBoundingClientRect();
    const birdProps = data.bird.rect;
    if (pipeSpriteProps.right <= 0) {
      element.remove();
    } else {
      if (birdProps.left < pipeSpriteProps.left + pipeSpriteProps.width
        && birdProps.left + birdProps.width > pipeSpriteProps.left
        && birdProps.top < pipeSpriteProps.top + pipeSpriteProps.height
        && birdProps.top + birdProps.height > pipeSpriteProps.top) {
        data.soundHitPipe.play();
        data.gameStatus = 'End';
        data.message.innerHTML = '<img src="../images/game-over.png" alt="Game over">';
        data.bird.stopFlying();
        if (data.gameStatus === 'End' && !isGameOver) {
          handleGameOver(data);
          data.isCollision = true;
        }
        return;
      } else {
        if (pipeSpriteProps.right < birdProps.left
          && pipeSpriteProps.right + data.moveSpeed >= birdProps.left
          && element.increaseScore === '1') {
          if (data.pipe.gap > minPipeGap) data.pipe.gap -= 1;
          // Перевірка на нові очки перед відтворенням звуку
          const currentScore = parseInt(data.scoreValue.innerHTML);
          const newScore = currentScore + 1; 
          data.scoreValue.innerHTML = newScore;
          // Відтворення звуку, якщо є нові очки
          if (newScore > currentScore) data.soundPoint.play(); 
        }
        element.style.left = pipeSpriteProps.left - data.moveSpeed + 'px';
      }
    }
  });
}

export function handleGameOver(data) {
  if (!data.isGameOver && data.gameStatus === 'End' && data.scoreValue.innerHTML !== '0') {
    data.currentScore = data.scoreValue.innerHTML;
    data.user.setScore(data.currentScore);
    const topScores = data.user.getTopPlayers();
    localStorage.setItem('topScores', JSON.stringify(topScores));
    isGameOver = true;
  }
}

