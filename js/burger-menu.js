const burgerMenu = document.querySelector('.header__burger-menu');
const offScreenMenu = document.querySelector('.header__off-screen-menu');
burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.toggle('active');
  offScreenMenu.classList.toggle('active');
  document.body.classList.toggle('lock');
  document.body.classList.toggle('block-scroll');
});

const navLinks = document.querySelectorAll('.header__navigation-link');
navLinks.forEach((navLink) => {
  navLink.addEventListener('click', (_) => {
    if (burgerMenu.classList.contains('active')) {
      document.body.classList.remove('lock');
      document.body.classList.remove('block-scroll');
      burgerMenu.classList.remove('active');
      offScreenMenu.classList.remove('active');
    }
  }
  );
});