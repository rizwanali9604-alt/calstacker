(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!navToggle || !navLinks) return;

  if (!navLinks.id) navLinks.id = 'site-nav-links';
  navToggle.setAttribute('aria-controls', navLinks.id);
  navToggle.setAttribute('aria-expanded', 'false');

  function setOpen(open) {
    navLinks.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  navToggle.addEventListener('click', function () {
    setOpen(!navLinks.classList.contains('open'));
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      setOpen(false);
    });
  });
})();
