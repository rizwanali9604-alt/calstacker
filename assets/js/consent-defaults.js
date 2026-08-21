/**
 * Consent Mode defaults — must load before AdSense.
 * Ads may run (AdSense snippet in <head> is required for review).
 * Analytics is denied until the visitor accepts.
 */
window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}

var analyticsGranted = false;
try {
  analyticsGranted =
    localStorage.getItem('calstacker_consent') === 'analytics' ||
    localStorage.getItem('calstacker_cookie_ok') === '1';
} catch (e) {
  analyticsGranted = false;
}

gtag('consent', 'default', {
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
  analytics_storage: analyticsGranted ? 'granted' : 'denied'
});
