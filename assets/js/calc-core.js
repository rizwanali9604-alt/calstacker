/* ================================================
   CALSTACKER.COM — SHARED CALCULATOR ENGINE
   All calculators use these shared utilities
   ================================================ */

function formatINR(amount) {
  return '₹' + Math.round(amount).toLocaleString('en-IN');
}

function formatINRLarge(amount) {
  if (amount >= 10000000) return '₹' + (amount / 10000000).toFixed(2) + ' Cr';
  if (amount >= 100000) return '₹' + (amount / 100000).toFixed(2) + ' L';
  return formatINR(amount);
}

function validatePositive(value, fieldName) {
  if (value === '' || value === null || value === undefined || isNaN(value) || Number(value) < 0) {
    alert(fieldName + ' must be a valid non-negative number');
    return false;
  }
  return true;
}

function validateRequiredPositive(value, fieldName) {
  if (!value || isNaN(value) || Number(value) <= 0) {
    alert(fieldName + ' must be a positive number');
    return false;
  }
  return true;
}

function showResult() {
  const box = document.getElementById('resultBox');
  if (box) {
    box.style.display = 'block';
    box.classList.add('visible');
  }
}

function setResult(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function getNum(id) {
  const el = document.getElementById(id);
  return el ? parseFloat(el.value) : NaN;
}

/* FY 2026-27 Tax Helpers */
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

function calcNewRegimeTax(taxableIncome) {
  if (taxableIncome <= 0) return 0;
  const tax = calcSlabTax(taxableIncome, [
    [400000, 0],
    [800000, 0.05],
    [1200000, 0.10],
    [1600000, 0.15],
    [2000000, 0.20],
    [2400000, 0.25],
    [Infinity, 0.30]
  ]);
  const rebate = taxableIncome <= 1200000 ? Math.min(tax, 60000) : 0;
  return Math.round(Math.max(0, tax - rebate));
}

function calcOldRegimeTax(taxableIncome) {
  if (taxableIncome <= 0) return 0;
  const tax = calcSlabTax(taxableIncome, [
    [250000, 0],
    [500000, 0.05],
    [1000000, 0.20],
    [Infinity, 0.30]
  ]);
  return Math.round(Math.max(0, tax));
}

function calcEMI(principal, annualRate, months) {
  if (annualRate === 0) return principal / months;
  const r = annualRate / 12 / 100;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

function calcSIPCorpus(monthly, annualReturn, years) {
  const i = annualReturn / 12 / 100;
  const n = years * 12;
  if (i === 0) return monthly * n;
  return monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
}

/** Monthly SIP needed to reach goal corpus */
function calcSIPForGoal(goalAmount, annualReturn, years) {
  const i = annualReturn / 12 / 100;
  const n = years * 12;
  if (goalAmount <= 0 || years <= 0) return 0;
  if (i === 0) return goalAmount / n;
  return goalAmount * i / ((Math.pow(1 + i, n) - 1) * (1 + i));
}

document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.parentElement.classList.toggle('open');
  });
});

document.querySelectorAll('.cat-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const cat = tab.dataset.cat;
    document.querySelectorAll('.calc-card').forEach(card => {
      card.style.display = (cat === 'all' || card.dataset.cat === cat) ? 'flex' : 'none';
    });
  });
});
