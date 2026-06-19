/**
 * Simple cookie consent for GA4 / AdSense disclosure.
 */
(function () {
  if (localStorage.getItem('calstacker_cookie_ok')) return;

  var bar = document.createElement('div');
  bar.className = 'cookie-banner';
  bar.setAttribute('role', 'dialog');
  bar.setAttribute('aria-label', 'Cookie notice');
  bar.innerHTML =
    '<p>We use cookies for analytics (Google Analytics) and may use advertising cookies if ads are enabled. ' +
    'Calculator inputs stay in your browser and are not stored on our servers. ' +
    '<a href="/privacy/">Privacy Policy</a></p>' +
    '<button type="button" class="cookie-accept">Accept</button>';

  document.body.appendChild(bar);

  bar.querySelector('.cookie-accept').addEventListener('click', function () {
    localStorage.setItem('calstacker_cookie_ok', '1');
    bar.remove();
  });
})();
