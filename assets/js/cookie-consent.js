/**
 * Cookie banner: AdSense may already be in <head>.
 * Google Analytics loads only after explicit analytics consent.
 */
(function () {
  var CONSENT_KEY = 'calstacker_consent';
  var LEGACY_KEY = 'calstacker_cookie_ok';
  var GA_ID = 'G-RR873MXQNX';

  function readConsent() {
    try {
      var v = localStorage.getItem(CONSENT_KEY);
      if (v === 'analytics' || v === 'ads_only') return v;
      if (localStorage.getItem(LEGACY_KEY) === '1') return 'analytics';
    } catch (e) {
      return null;
    }
    return null;
  }

  function writeConsent(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
      if (value === 'analytics') localStorage.setItem(LEGACY_KEY, '1');
      else localStorage.removeItem(LEGACY_KEY);
    } catch (e) { /* private mode */ }
  }

  function loadGA() {
    if (window.__csGaLoaded) return;
    window.__csGaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    gtag('consent', 'update', { analytics_storage: 'granted' });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  var consent = readConsent();
  if (consent === 'analytics') {
    loadGA();
    return;
  }
  if (consent === 'ads_only') return;

  var bar = document.createElement('div');
  bar.className = 'cookie-banner';
  bar.setAttribute('role', 'dialog');
  bar.setAttribute('aria-label', 'Cookie notice');
  bar.innerHTML =
    '<p>Google ads may load so this site can stay free. Calculator numbers stay in your browser. ' +
    'Analytics (Google Analytics) runs only if you accept. ' +
    '<a href="/privacy/">Privacy Policy</a></p>' +
    '<div class="cookie-banner-actions">' +
    '<button type="button" class="cookie-accept">Accept analytics</button>' +
    '<button type="button" class="cookie-decline">Ads only</button>' +
    '</div>';

  function mount() {
    document.body.appendChild(bar);
    bar.querySelector('.cookie-accept').addEventListener('click', function () {
      writeConsent('analytics');
      loadGA();
      bar.remove();
    });
    bar.querySelector('.cookie-decline').addEventListener('click', function () {
      writeConsent('ads_only');
      bar.remove();
    });
  }

  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
