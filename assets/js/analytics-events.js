/**
 * CalStacker GA4 custom events — include after gtag is loaded.
 */
function trackEvent(name, params) {
  if (typeof gtag === 'function') {
    gtag('event', name, params || {});
  }
}

function trackCalculate(calculatorName) {
  trackEvent('calculate_click', {
    calculator: calculatorName || document.title,
    page_path: window.location.pathname
  });
}

function trackResultView(calculatorName) {
  trackEvent('result_view', {
    calculator: calculatorName || document.title,
    page_path: window.location.pathname
  });
}

function trackAffiliateClick(partner, calculatorName) {
  trackEvent('affiliate_click', {
    partner: partner || 'unknown',
    calculator: calculatorName || document.title,
    page_path: window.location.pathname
  });
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.aff-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const partner = btn.dataset.partner || btn.textContent.trim().slice(0, 32);
      trackAffiliateClick(partner);
    });
  });
});

// Enhanced showResult wrapper when calc-core loads first
(function patchShowResult() {
  const orig = window.showResult;
  if (typeof orig !== 'function') return;
  window.showResult = function () {
    orig.apply(this, arguments);
    const calc = document.querySelector('.calc-page-title');
    trackResultView(calc ? calc.textContent : undefined);
  };
})();
