(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!navToggle || !navLinks) return;

  if (!navLinks.id) navLinks.id = 'site-nav-links';
  navToggle.setAttribute('aria-controls', navLinks.id);
  navToggle.setAttribute('aria-expanded', 'false');

  navToggle.addEventListener('click', function () {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
})();
