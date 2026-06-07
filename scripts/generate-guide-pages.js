/**
 * Generate long-tail guide pages from data/guide-pages.json
 * Run: node scripts/generate-guide-pages.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const guides = JSON.parse(fs.readFileSync(path.join(root, 'data/guide-pages.json'), 'utf8'));

const CALC_URLS = {
  emi: '/calculators/emi/',
  sip: '/calculators/sip/',
  salary: '/calculators/salary/',
  'income-tax': '/calculators/income-tax/',
  hra: '/calculators/hra/'
};

function head(title, desc, canonical) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — CalStacker.com</title>
  <meta name="description" content="${desc}">
  <link rel="canonical" href="https://calstacker.com/guides/${canonical}/">
  <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/css/style.css">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-RR873MXQNX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-RR873MXQNX');
  </script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8332278519903196" crossorigin="anonymous"></script>
</head>
<body>
  <nav class="nav">
    <div class="nav-inner">
      <a href="/" class="nav-logo">Cal<span>Stacker</span></a>
      <div class="nav-links">
        <a href="/blog/" class="nav-link">Blog</a>
        <a href="/#tools" class="nav-link">Calculators</a>
        <a href="${CALC_URLS.emi}" class="nav-cta">EMI Calculator</a>
      </div>
      <button class="nav-toggle" aria-label="Menu">☰</button>
    </div>
  </nav>
  <header class="calc-page-header">
    <div class="container">
      <div class="breadcrumb"><a href="/">Home</a> → <a href="/guides/">Guides</a> → ${title}</div>
      <h1 class="calc-page-title">${title}</h1>
    </div>
  </header>
  <div class="container"><div class="ad-slot">Advertisement</div></div>`;
}

function footer() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-bottom" style="border:none;padding-top:20px;">
        <span>© 2026 CalStacker.com</span>
        <span><a href="/disclaimer/" style="color:#94A3B8;">Disclaimer</a></span>
      </div>
    </div>
  </footer>
  <script src="/assets/js/calc-core.js"></script>
  <script src="/assets/js/nav.js"></script>
  <script src="/assets/js/analytics-events.js"></script>
  <script src="/assets/js/ads-config.js"></script>
</body>
</html>`;
}

function calcScript(g) {
  const d = JSON.stringify(g.defaults);
  if (g.calc === 'emi') {
    return `
  <script>
    const defs = ${d};
    document.getElementById('calcBtn').addEventListener('click', function () {
      const P = parseFloat(document.getElementById('principal').value);
      const rate = parseFloat(document.getElementById('rate').value);
      let months = parseInt(document.getElementById('tenure').value, 10) * 12;
      if (!validateRequiredPositive(P, 'Principal')) return;
      const emi = calcEMI(P, rate, months);
      setResult('mainResult', formatINR(emi));
      setResult('r1', formatINRLarge(emi * months - P));
      setResult('r2', formatINRLarge(emi * months));
      showResult();
      if (typeof trackCalculate === 'function') trackCalculate('${g.title}');
    });
  </script>`;
  }
  if (g.calc === 'sip') {
    return `
  <script>
    document.getElementById('calcBtn').addEventListener('click', function () {
      const m = parseFloat(document.getElementById('monthly').value);
      const r = parseFloat(document.getElementById('rate').value);
      const y = parseFloat(document.getElementById('years').value);
      if (!validateRequiredPositive(m, 'Monthly SIP')) return;
      const corpus = calcSIPCorpus(m, r, y);
      const invested = m * y * 12;
      setResult('mainResult', formatINRLarge(corpus));
      setResult('r1', formatINRLarge(invested));
      setResult('r2', formatINRLarge(corpus - invested));
      showResult();
      if (typeof trackCalculate === 'function') trackCalculate('${g.title}');
    });
  </script>`;
  }
  if (g.calc === 'salary') {
    return `
  <script>
    document.getElementById('calcBtn').addEventListener('click', function () {
      const ctc = parseFloat(document.getElementById('ctc').value);
      if (!validateRequiredPositive(ctc, 'CTC')) return;
      const basic = ctc * 0.4 / 12;
      const pf = Math.min(basic, 15000) * 0.12;
      const pt = 200;
      const annualTaxable = Math.max(0, ctc - 75000);
      const tax = calcNewRegimeTax(annualTaxable) * 1.04;
      const monthlyTax = tax / 12;
      const inHand = ctc / 12 - pf - pt - monthlyTax;
      setResult('mainResult', formatINR(inHand));
      setResult('r1', formatINR(pf));
      setResult('r2', formatINR(monthlyTax));
      showResult();
      if (typeof trackCalculate === 'function') trackCalculate('${g.title}');
    });
  </script>`;
  }
  if (g.calc === 'income-tax') {
    return `
  <script>
    document.getElementById('calcBtn').addEventListener('click', function () {
      const inc = parseFloat(document.getElementById('income').value);
      const d80c = Math.min(parseFloat(document.getElementById('d80c').value) || 0, 150000);
      if (!validateRequiredPositive(inc, 'Income')) return;
      const oldT = Math.round(calcOldRegimeTax(Math.max(0, inc - 50000 - d80c)) * 1.04);
      const newT = Math.round(calcNewRegimeTax(Math.max(0, inc - 75000)) * 1.04);
      setResult('mainResult', formatINR(Math.min(oldT, newT)));
      setResult('r1', formatINR(oldT));
      setResult('r2', formatINR(newT));
      showResult();
      if (typeof trackCalculate === 'function') trackCalculate('${g.title}');
    });
  </script>`;
  }
  if (g.calc === 'hra') {
    return `
  <script>
    document.getElementById('calcBtn').addEventListener('click', function () {
      const basic = parseFloat(document.getElementById('basic').value);
      const hra = parseFloat(document.getElementById('hra').value);
      const rent = parseFloat(document.getElementById('rent').value);
      const metro = document.getElementById('metro').value === '1';
      if (!validateRequiredPositive(basic, 'Basic')) return;
      const cap = metro ? basic * 0.5 : basic * 0.4;
      const exempt = Math.max(0, Math.min(hra, rent - basic * 0.1, cap));
      setResult('mainResult', formatINR(exempt));
      setResult('r1', formatINR(hra - exempt));
      setResult('r2', formatINR(exempt * 0.3 * 12));
      showResult();
      if (typeof trackCalculate === 'function') trackCalculate('${g.title}');
    });
  </script>`;
  }
  return '';
}

function calcForm(g) {
  const d = g.defaults;
  if (g.calc === 'emi') {
    return `
      <div class="form-group"><label class="form-label">Loan Amount (₹)</label><input class="form-input" id="principal" type="number" value="${d.principal}"></div>
      <div class="form-grid">
        <div class="form-group"><label class="form-label">Rate (% p.a.)</label><input class="form-input" id="rate" type="number" value="${d.rate}" step="0.1"></div>
        <div class="form-group"><label class="form-label">Tenure (years)</label><input class="form-input" id="tenure" type="number" value="${d.tenureValue}"></div>
      </div>`;
  }
  if (g.calc === 'sip') {
    return `
      <div class="form-group"><label class="form-label">Monthly SIP (₹)</label><input class="form-input" id="monthly" type="number" value="${d.monthly}"></div>
      <div class="form-grid">
        <div class="form-group"><label class="form-label">Return (% p.a.)</label><input class="form-input" id="rate" type="number" value="${d.rate}"></div>
        <div class="form-group"><label class="form-label">Years</label><input class="form-input" id="years" type="number" value="${d.years}"></div>
      </div>`;
  }
  if (g.calc === 'salary') {
    return `<div class="form-group"><label class="form-label">Annual CTC (₹)</label><input class="form-input" id="ctc" type="number" value="${d.ctc}"></div>`;
  }
  if (g.calc === 'income-tax') {
    return `
      <div class="form-group"><label class="form-label">Annual Income (₹)</label><input class="form-input" id="income" type="number" value="${d.annualIncome}"></div>
      <div class="form-group"><label class="form-label">80C Deduction (₹)</label><input class="form-input" id="d80c" type="number" value="${d.deduction80C || 0}"></div>`;
  }
  if (g.calc === 'hra') {
    return `
      <div class="form-grid">
        <div class="form-group"><label class="form-label">Basic (₹/mo)</label><input class="form-input" id="basic" type="number" value="${d.basic}"></div>
        <div class="form-group"><label class="form-label">HRA received</label><input class="form-input" id="hra" type="number" value="${d.hra}"></div>
      </div>
      <div class="form-grid">
        <div class="form-group"><label class="form-label">Rent paid</label><input class="form-input" id="rent" type="number" value="${d.rent}"></div>
        <div class="form-group"><label class="form-label">Metro city</label><select class="form-select" id="metro"><option value="1" selected>Yes</option><option value="0">No</option></select></div>
      </div>`;
  }
  return '';
}

function resultLabels(g) {
  const map = {
    emi: ['Monthly EMI', 'Total Interest', 'Total Payment'],
    sip: ['Estimated Corpus', 'Total Invested', 'Estimated Returns'],
    salary: ['Monthly In-Hand', 'PF/month', 'TDS/month'],
    'income-tax': ['Lower Tax', 'Old Regime', 'New Regime'],
    hra: ['HRA Exempt/month', 'Taxable HRA', 'Est. Tax Saved/yr']
  };
  const l = map[g.calc] || ['Result', 'Detail 1', 'Detail 2'];
  return l;
}

guides.forEach(g => {
  const labels = resultLabels(g);
  const calcUrl = CALC_URLS[g.calc] || '/';
  const html = head(g.title, g.description, g.slug) + `
  <main class="calc-interface">
    <div class="calc-box">
      <p style="color:var(--text-secondary);margin-bottom:20px;line-height:1.7;">${g.intro}</p>
      ${calcForm(g)}
      <button type="button" class="calc-btn" id="calcBtn">Calculate</button>
      <div class="result-box" id="resultBox">
        <div class="result-main"><div class="result-label">${labels[0]}</div><div class="result-value" id="mainResult">₹0</div></div>
        <div class="result-grid">
          <div class="result-item"><div class="result-item-label">${labels[1]}</div><div class="result-item-value" id="r1">₹0</div></div>
          <div class="result-item"><div class="result-item-label">${labels[2]}</div><div class="result-item-value green" id="r2">₹0</div></div>
        </div>
      </div>
      <p style="margin-top:20px;font-size:14px;"><a href="${calcUrl}">Open full ${g.calc} calculator →</a></p>
    </div>
  </main>
  <div class="container"><div class="ad-slot">Advertisement</div></div>
  ` + calcScript(g) + footer();

  const dir = path.join(root, 'guides', ...g.slug.split('/'));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log('generated', g.slug);
});

// guides index
const indexHtml = head('Finance Guides — CalStacker', 'Long-tail EMI, SIP, tax and salary guides for India.', 'index').replace(
  '<h1 class="calc-page-title">Finance Guides — CalStacker</h1>',
  '<h1 class="calc-page-title">Finance Guides</h1><p class="calc-page-desc">Scenario calculators for common India finance searches</p>'
) + `
  <section class="section-sm"><div class="container"><div class="calc-grid">
  ${guides.map(g => `<a href="/guides/${g.slug}/" class="calc-card"><div class="calc-icon-wrap">📘</div><div class="calc-info"><div class="calc-name">${g.title}</div><div class="calc-desc">${g.description.slice(0, 80)}...</div></div><span class="calc-arrow">→</span></a>`).join('')}
  </div></div></section>` + footer();
fs.mkdirSync(path.join(root, 'guides'), { recursive: true });
fs.writeFileSync(path.join(root, 'guides/index.html'), indexHtml);
console.log('done —', guides.length, 'guides');
