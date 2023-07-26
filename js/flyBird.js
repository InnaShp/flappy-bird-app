// export function flyBird (data) {
//   data.bird.updateBirdPosition();
//   document.addEventListener('keydown', (e) => {
//     if (e.key == 'ArrowUp' || e.key == ' ') {
//       data.soundFlap.play();
//       data.bird.flapWings();
//       data.bird.velocityY = -10;
//     }
//   });
//   document.addEventListener('keyup', (e) => {
//     if (e.key == 'ArrowUp' || e.key == ' ') {
//       data.soundFlap.play();
//       data.bird.stopFlappingWings();
//     }
//   });
//   if (data.bird.rect.top <= 0 || data.bird.rect.bottom >= data.background.bottom) {
//     data.soundDie.play();
//     data.gameStatus = 'End';
//     data.message.innerHTML = '<img src="../images/game-over.png" alt="Game over"><a href="#" id="restart">Restart</a>';
//     data.bird.stopFlying();
//     const restart = document.getElementById('restart');
//     restart.addEventListener('click', (e) => {
//       e.preventDefault();
//       window.location.reload()
//     });
//     return;
//   }
// }
export function flyBird (data) {
  data.bird.updateBirdPosition();

  function startFlying() {
    const handleKeyDown = (e) => {
      if (e.key == 'ArrowUp' || e.key == ' ') {
        data.bird.flapWings();
        data.bird.velocityY = -10;
        data.soundFlap.play(); 
      }
    };
    const handleKeyUp = (e) => {
      if (e.key == 'ArrowUp' || e.key == ' ') data.bird.stopFlappingWings();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
  }

  function stopFlying() {
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('keyup', handleKeyUp);
  }

  if (data.gameStatus === 'Play') {
    startFlying();
  }

  if (data.bird.rect.top <= 0 || data.bird.rect.bottom >= data.background.bottom) {
    data.soundDie.play();
    data.gameStatus = 'End';
    data.message.innerHTML = '<img src="../images/game-over.png" alt="Game over"><a href="#" id="restart">Restart</a>';
    data.bird.stopFlying();
    const restart = document.getElementById('restart');
    restart.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.reload();
    });

    stopFlying();

    return;
  }
}

