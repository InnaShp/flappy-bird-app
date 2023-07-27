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
    if (data.gameStatus === 'End' && !isGameOver) handleGameOver(data);
  });
}

// function handleGameOver(data) {
//   if (!data.isGameOver && data.scoreValue.innerHTML !== '0') {
//     //data.currentScore = parseInt(data.scoreValue.innerHTML);
//     data.currentScore = 11;
//     // Отримуємо поточний найкращий рекорд користувача
//     const userBestScore = data.user.getTopPlayers().find(userRecord => userRecord.name === data.user.name);

//     // Перевіряємо, чи поточний рахунок більший за найкращий рекорд користувача
//     if (!userBestScore || data.currentScore > userBestScore.score) {
//       data.user.setScore(data.currentScore);
      
//       // Оновлюємо список рекордів у localStorage, тільки якщо був побитий рекорд
//       const topScores = data.user.getTopPlayers();
//       localStorage.setItem('topScores', JSON.stringify(topScores));
//     }

//     isGameOver = true;
//   }
// }

function handleGameOver(data) {
  if (!data.isGameOver && data.scoreValue.innerHTML !== '0') {
    data.currentScore = parseInt(data.scoreValue.innerHTML);
    data.user.setScore(data.currentScore);

    // Оновлюємо список рекордів у localStorage
    const topScores = data.user.getTopPlayers();
    localStorage.setItem('topScores', JSON.stringify(topScores));

    isGameOver = true;
  }
}

