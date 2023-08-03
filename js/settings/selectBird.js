const selectBtns = document.querySelectorAll('.settings__btn');
const selectedBird = localStorage.getItem('selectedBird');

selectBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const isActive = btn.classList.contains('active');
    selectBtns.forEach((otherBtn) => {
      if (otherBtn !== btn) {
        otherBtn.classList.remove('active');
        otherBtn.textContent = "Pick Me";
      }
    });
    btn.classList.toggle('active', !isActive);
    btn.textContent = isActive ? 'Pick Me' : "I'm ready!";
    const birdImg = btn.parentElement.querySelector('.settings__bird-img');
    const birdSrc = birdImg.getAttribute('src');
    localStorage.setItem('selectedBird', isActive ? '' : birdSrc);
  });

  if (selectedBird) {
    const birdImg = btn.parentElement.querySelector('.settings__bird-img');
    const birdSrc = birdImg.getAttribute('src');
    if (selectedBird === birdSrc) {
      btn.classList.add('active');
      btn.textContent = "I'm ready!";
    }
  }
});
