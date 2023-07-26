let isGameOver = false;
export function checkBirdPipeCollision(data) {
  const pipeSprite = document.querySelectorAll('.pipeSprite');
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
        return;
      } else {
        if (pipeSpriteProps.right < birdProps.left
          && pipeSpriteProps.right + data.moveSpeed >= birdProps.left
          && element.increaseScore == '1') {
          data.soundPoint.play();
          data.scoreValue.innerHTML = + data.scoreValue.innerHTML + 1;
        }
        element.style.left = pipeSpriteProps.left - data.moveSpeed + 'px';
      }
    }
    if (data.gameStatus === 'End' && !isGameOver) {
      handleGameOver(data);
    }
    
  });
}

function handleGameOver(data) {
  if (!data.isGameOver) {
    data.currentScore = parseInt(data.scoreValue.innerHTML);
    data.user.setScore(data.currentScore);

    const bestScore = data.user.getBestScore();
    const bestScoreWithin24Hours = data.user.getBestScoreWithin24Hours();

    console.log('Найкращий результат усіх часів:', bestScore);
    console.log('Найкращий результат за останні 24 години:', bestScoreWithin24Hours);

    isGameOver = true;
  }
}