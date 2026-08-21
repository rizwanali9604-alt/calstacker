/* ================================================
   CALSTACKER.COM — SHARED CALCULATOR ENGINE
   Tax helpers last verified: 17 August 2026
   FY 2026-27 / Tax Year 2026-27 (AY 2027-28)
   Budget 2026 did not change personal slab rates
   vs FY 2025-26 (Income-tax Act, 2025).
   ================================================ */

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function formatINR(amount) {
  const n = Number(amount);
  if (!isFinite(n)) return '₹0';
  return '₹' + Math.round(n).toLocaleString('en-IN');
}

function formatINRLarge(amount) {
  const n = Number(amount);
  if (!isFinite(n)) return '₹0';
  if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2) + ' Cr';
  if (n >= 100000) return '₹' + (n / 100000).toFixed(2) + ' L';
  return formatINR(n);
}

function clearCalcError() {
  const el = document.getElementById('calcFormError');
  if (el) {
    el.textContent = '';
    el.hidden = true;
  }
  document.querySelectorAll('.form-input-error').forEach(function (field) {
    field.classList.remove('form-input-error');
    field.removeAttribute('aria-invalid');
  });
}

function showCalcError(message) {
  let el = document.getElementById('calcFormError');
  if (!el) {
    el = document.createElement('div');
    el.id = 'calcFormError';
    el.className = 'calc-form-error';
    el.setAttribute('role', 'alert');
    const btn = document.getElementById('calcBtn');
    const form = document.querySelector('.calc-box form') || document.querySelector('form');
    if (btn && btn.parentNode) {
      btn.parentNode.insertBefore(el, btn);
    } else if (form) {
      form.appendChild(el);
    } else {
      const box = document.querySelector('.calc-box');
      if (box) box.insertBefore(el, box.firstChild);
    }
  }
  el.hidden = false;
  el.textContent = message;
}

function validatePositive(value, fieldName) {
  if (value === '' || value === null || value === undefined || isNaN(value) || Number(value) < 0) {
    showCalcError(fieldName + ' must be a valid non-negative number');
    return false;
  }
  return true;
}

function validateRequiredPositive(value, fieldName) {
  if (!value || isNaN(value) || Number(value) <= 0) {
    showCalcError(fieldName + ' must be a positive number');
    return false;
  }
  return true;
}

function showResult() {
  clearCalcError();
  const box = document.getElementById('resultBox');
  if (box) {
    box.style.display = 'block';
    box.classList.add('visible');
    box.setAttribute('aria-live', 'polite');
    box.setAttribute('aria-atomic', 'true');
  }
}

function setResult(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = value;
  if (prefersReducedMotion()) return;
  el.classList.remove('result-pop');
  void el.offsetWidth;
  el.classList.add('result-pop');
}

function getNum(id) {
  const el = document.getElementById(id);
  return el ? parseFloat(el.value) : NaN;
}

/* ---------- Tax slabs (FY 2026-27) ---------- */

function calcSlabTax(income, slabs) {
  let tax = 0;
  let prev = 0;
  for (const [limit, rate] of slabs) {
    if (income <= prev) break;
    const taxable = Math.min(income, limit) - prev;
    if (taxable > 0) tax += taxable * rate;
    prev = limit;
  }
  return tax;
}

const NEW_REGIME_SLABS = [
  [400000, 0],
  [800000, 0.05],
  [1200000, 0.10],
  [1600000, 0.15],
  [2000000, 0.20],
  [2400000, 0.25],
  [Infinity, 0.30]
];

const OLD_REGIME_SLABS = [
  [250000, 0],
  [500000, 0.05],
  [1000000, 0.20],
  [Infinity, 0.30]
];

/** Slab tax after Section 87A rebate + marginal relief. Before surcharge and cess. */
function calcNewRegimeTax(taxableIncome) {
  if (taxableIncome <= 0) return 0;
  const tax = calcSlabTax(taxableIncome, NEW_REGIME_SLABS);
  if (taxableIncome <= 1200000) {
    const rebate = Math.min(tax, 60000);
    return Math.round(Math.max(0, tax - rebate));
  }
  const excess = taxableIncome - 1200000;
  return Math.round(Math.max(0, Math.min(tax, excess)));
}

function calcOldRegimeTax(taxableIncome) {
  if (taxableIncome <= 0) return 0;
  const tax = calcSlabTax(taxableIncome, OLD_REGIME_SLABS);
  if (taxableIncome <= 500000) {
    const rebate = Math.min(tax, 12500);
    return Math.round(Math.max(0, tax - rebate));
  }
  const excess = taxableIncome - 500000;
  return Math.round(Math.max(0, Math.min(tax, excess)));
}

function surchargeRate(income, regime) {
  if (income <= 5000000) return 0;
  if (income <= 10000000) return 0.10;
  if (income <= 20000000) return 0.15;
  if (income <= 50000000) return 0.25;
  return regime === 'old' ? 0.37 : 0.25;
}

function surchargeThreshold(income) {
  if (income > 50000000) return 50000000;
  if (income > 20000000) return 20000000;
  if (income > 10000000) return 10000000;
  if (income > 5000000) return 5000000;
  return 0;
}

function calcSurcharge(taxAfterRebate, taxableIncome, regime) {
  const rate = surchargeRate(taxableIncome, regime);
  if (rate === 0 || taxAfterRebate <= 0) return 0;
  const raw = taxAfterRebate * rate;
  const threshold = surchargeThreshold(taxableIncome);
  if (!threshold) return Math.round(raw);
  const taxFn = regime === 'old' ? calcOldRegimeTax : calcNewRegimeTax;
  const taxAtThreshold = taxFn(threshold);
  const surchargeAtThreshold = taxAtThreshold * surchargeRate(threshold, regime);
  const maxTotal = taxAtThreshold + surchargeAtThreshold + (taxableIncome - threshold);
  const tentative = taxAfterRebate + raw;
  if (tentative > maxTotal) {
    return Math.round(Math.max(0, maxTotal - taxAfterRebate));
  }
  return Math.round(raw);
}

function withCess(baseTax) {
  return Math.round(Number(baseTax || 0) * 1.04);
}

/**
 * Full individual tax: rebate + surcharge (with marginal relief) + 4% cess.
 * Excludes special-rate income (capital gains) and non-resident rules.
 */
function calcIncomeTax(taxableIncome, regime) {
  const r = regime === 'old' ? 'old' : 'new';
  const taxAfterRebate = r === 'old' ? calcOldRegimeTax(taxableIncome) : calcNewRegimeTax(taxableIncome);
  const surcharge = calcSurcharge(taxAfterRebate, taxableIncome, r);
  const beforeCess = taxAfterRebate + surcharge;
  const cess = Math.round(beforeCess * 0.04);
  return {
    regime: r,
    taxableIncome: Math.max(0, taxableIncome),
    taxAfterRebate,
    surcharge,
    cess,
    total: beforeCess + cess
  };
}

/* ---------- Professional tax (simplified state map) ---------- */
/* Annual amounts for typical salaried income above the state threshold.
   Maharashtra February is ₹300; other months ₹200 (₹2,500/year). */

const PROFESSIONAL_TAX_ANNUAL = {
  KA: 2400,
  MH: 2500,
  WB: 2400,
  TN: 2500,
  TS: 2400,
  AP: 2400,
  GJ: 2400,
  KL: 2500,
  MP: 2500,
  OD: 2500,
  AS: 2500,
  NONE: 0
};

function getProfessionalTaxAnnual(stateCode, grossMonthly) {
  if (!grossMonthly || grossMonthly <= 15000) return 0;
  return PROFESSIONAL_TAX_ANNUAL[stateCode] || 0;
}

function getProfessionalTaxForMonth(stateCode, monthIndex, grossMonthly) {
  const annual = getProfessionalTaxAnnual(stateCode, grossMonthly);
  if (annual === 0) return 0;
  if (stateCode === 'MH') return monthIndex === 10 ? 300 : 200;
  return Math.round(annual / 12);
}

/* ---------- HRA (old regime, Section 10(13A) / Rule 2A) ---------- */

function calcHRAExemption(basic, hraReceived, rentPaid, isMetro) {
  const metroPct = isMetro ? 0.5 : 0.4;
  const a = Math.max(0, hraReceived);
  const b = Math.max(0, rentPaid - 0.1 * basic);
  const c = Math.max(0, metroPct * basic);
  return Math.min(a, b, c);
}

/* ---------- Loan / investment formulas ---------- */

function calcEMI(principal, annualRate, months) {
  if (!months || months <= 0) return 0;
  if (annualRate === 0) return principal / months;
  const r = annualRate / 12 / 100;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

/** SIP future value — annuity due (instalment at start of each month). */
function calcSIPCorpus(monthly, annualReturn, years) {
  const i = annualReturn / 12 / 100;
  const n = years * 12;
  if (i === 0) return monthly * n;
  return monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
}

function calcSIPForGoal(goalAmount, annualReturn, years) {
  const i = annualReturn / 12 / 100;
  const n = years * 12;
  if (goalAmount <= 0 || years <= 0) return 0;
  if (i === 0) return goalAmount / n;
  return goalAmount * i / ((Math.pow(1 + i, n) - 1) * (1 + i));
}

/* ---------- UI: FAQ, filters, scrollable tables ---------- */

document.querySelectorAll('.table-wrap').forEach(function (wrap, i) {
  wrap.setAttribute('tabindex', '0');
  wrap.setAttribute('role', 'region');
  const prev = wrap.previousElementSibling;
  if (prev && /^H[1-6]$/.test(prev.tagName)) {
    if (!prev.id) prev.id = 'table-heading-' + (i + 1);
    wrap.setAttribute('aria-labelledby', prev.id);
  } else {
    wrap.setAttribute('aria-label', 'Results table');
  }
});

document.querySelectorAll('.faq-q').forEach(function (btn, i) {
  const item = btn.parentElement;
  const panel = item ? item.querySelector('.faq-a') : null;
  if (panel && !panel.id) {
    panel.id = 'faq-panel-' + (i + 1);
  }
  btn.setAttribute('aria-expanded', item && item.classList.contains('open') ? 'true' : 'false');
  if (panel) btn.setAttribute('aria-controls', panel.id);
  btn.addEventListener('click', function () {
    const open = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
});

(function initCatalogTabs() {
  const tablist = document.querySelector('.cat-tabs');
  if (!tablist) return;

  tablist.setAttribute('role', 'tablist');
  tablist.setAttribute('aria-label', 'Calculator categories');

  const tabs = Array.prototype.slice.call(tablist.querySelectorAll('.cat-tab'));
  const catalog = document.getElementById('calc-catalog');
  const live = document.getElementById('catalog-live');

  function applyCat(cat, setHash) {
    tabs.forEach(function (t) {
      const on = t.getAttribute('data-cat') === cat;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.setAttribute('tabindex', on ? '0' : '-1');
    });
    if (catalog) {
      catalog.setAttribute('role', 'tabpanel');
      const active = tabs.filter(function (t) {
        return t.getAttribute('data-cat') === cat;
      })[0];
      if (active) catalog.setAttribute('aria-labelledby', active.id);
      let shown = 0;
      catalog.querySelectorAll('.calc-card').forEach(function (card) {
        const match = cat === 'all' || card.getAttribute('data-cat') === cat;
        card.hidden = !match;
        if (match) shown += 1;
      });
      if (live) {
        live.textContent = shown + (shown === 1 ? ' calculator shown' : ' calculators shown');
      }
    }
    if (setHash && history.replaceState) {
      const id = cat === 'all' ? 'tools' : cat;
      history.replaceState(null, '', '#' + id);
    }
  }

  tabs.forEach(function (tab, i) {
    const cat = tab.getAttribute('data-cat') || String(i);
    if (!tab.id) tab.id = 'cat-tab-' + cat;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', 'calc-catalog');
    tab.addEventListener('click', function () {
      applyCat(tab.getAttribute('data-cat'), true);
    });
    tab.addEventListener('keydown', function (e) {
      let next = i;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % tabs.length;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      else return;
      e.preventDefault();
      tabs[next].focus();
      applyCat(tabs[next].getAttribute('data-cat'), true);
    });
  });

  function fromHash() {
    const hash = (location.hash || '').replace('#', '');
    if (hash === 'employee' || hash === 'investor') applyCat(hash, false);
    else applyCat('all', false);
  }

  fromHash();
  window.addEventListener('hashchange', fromHash);
})();
