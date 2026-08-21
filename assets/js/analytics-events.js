/**
 * CalStacker GA4 custom events — include after gtag is loaded.
 * No-ops until the visitor accepts analytics (gtag then exists).
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

(function patchShowResult() {
  const orig = window.showResult;
  if (typeof orig !== 'function') return;
  window.showResult = function () {
    orig.apply(this, arguments);
    const calc = document.querySelector('.calc-page-title');
    trackResultView(calc ? calc.textContent : undefined);
  };
})();
