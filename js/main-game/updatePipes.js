const gameConfig = {
  pipeGenerationThresholdDesktop: 115, // Відстань для десктопу
  pipeGenerationThresholdMobile: 70, // Відстань для мобільних пристроїв
  pipeVerticalPositionRange: 40, // Діапазон для вертикальних позицій труб
  initialPipePosition: 8, // Початкова вертикальна позиція труби
  updatePipeGenerationThreshold: function () { // Встановлюємо відстань щодо розміру вікна
    return window.innerWidth < 768 
      ? this.pipeGenerationThresholdMobile
      : this.pipeGenerationThresholdDesktop;
  }
};

export function updatePipes (data) {
  if (data.pipe.separation > gameConfig.updatePipeGenerationThreshold()) {
    data.pipe.separation = 0;
    const pipePosition = Math.floor(Math.random() * gameConfig.pipeVerticalPositionRange) + gameConfig.initialPipePosition;
    const pipeSpriteUp = document.createElement('div');
    const pipeSprite = document.createElement('div');
    data.pipe.createPipeSprite(pipeSpriteUp, pipePosition);
    data.pipe.setPipeSpriteProperties(pipeSprite, pipePosition);
    document.body.appendChild(pipeSpriteUp);
    document.body.appendChild(pipeSprite);
  }
  data.pipe.separation++;
}