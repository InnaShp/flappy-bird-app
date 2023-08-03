export function updatePipes (data) {
  if (data.pipe.separation > 115) {
    data.pipe.separation = 0;
    const pipePosition = Math.floor(Math.random() * 43) + 8;
    const pipeSpriteUp = document.createElement('div');
    const pipeSprite = document.createElement('div');
    data.pipe.createPipeSprite(pipeSpriteUp, pipePosition);
    data.pipe.setPipeSpriteProperties(pipeSprite, pipePosition);
    document.body.appendChild(pipeSpriteUp);
    document.body.appendChild(pipeSprite);
  }
  data.pipe.separation++;
}