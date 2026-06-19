/**
 * Inject rich SEO content sections into all calculator pages.
 * Run: node scripts/inject-calc-seo.js
 */
const fs = require('fs');
const path = require('path');
const data = require('./calc-seo-data.js');

const root = path.join(__dirname, '..');

function buildSeoSection(slug, d) {
  const factors = d.factors.map(f => `<li>${f}</li>`).join('\n          ');
  const extraFaqs = (d.extraFaqs || []).map(f =>
    `        <div class="faq-item">
          <button class="faq-q" type="button">${f.q}<span class="faq-icon">+</span></button>
          <div class="faq-a">${f.a}</div>
        </div>`
  ).join('\n');

  return {
    article: `
  <section class="section-sm calc-seo-section">
    <div class="container">
      <div class="calc-seo-content">
        <h2>Understanding ${slug === 'income-tax' ? 'Income Tax' : slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} in India</h2>
        <p>${d.intro}</p>
        <h3>Formula</h3>
        <p class="calc-formula-box">${d.formula}</p>
        <h3>Worked Example</h3>
        <p>${d.example}</p>
        <h3>Key Factors That Affect Your Result</h3>
        <ul class="calc-factor-list">
          ${factors}
        </ul>
        <div class="tool-cta-inline">
          <h3>Read Our Full ${d.guideTitle}</h3>
          <p>In-depth guide with Indian examples, common mistakes, and FAQs.</p>
          <a href="${d.guide}" class="btn-primary">Open Guide →</a>
        </div>
        <p class="editorial-byline">Written by CalStacker Editorial · Last updated June 2026 · <a href="/about/">Methodology</a></p>
      </div>
    </div>
  </section>`,
    extraFaqs
  };
}

function injectTrustNote(html) {
  if (html.includes('editorial-trust-bar')) return html;
  const bar = `<div class="editorial-trust-bar">
    <div class="container">
      <span>✓ Free · No signup · Calculations run in your browser · <a href="/about/">About CalStacker</a></span>
    </div>
  </div>`;
  return html.replace(
    /(<\/header>\s*)(<main class="calc-interface">|<div class="calc-interface">)/,
    '$1\n' + bar + '\n\n  $2'
  );
}

function injectSeoArticle(html, article) {
  if (html.includes('calc-seo-section')) return html;

  const anchors = [
    '<section class="section-sm" style="padding-top:0;">',
    '<section class="section-sm" style="background:var(--card);border-top:1px solid var(--border);">',
    '<section class="section-sm">\n    <div class="container">\n      <div class="section-header"><h2>Frequently Asked Questions</h2></div>'
  ];
  for (const anchor of anchors) {
    if (html.includes(anchor)) {
      return html.replace(anchor, article + '\n\n  ' + anchor);
    }
  }
  // Fallback: before footer
  return html.replace('<footer class="footer">', article + '\n\n  <footer class="footer">');
}

for (const [slug, d] of Object.entries(data)) {
  const file = path.join(root, 'calculators', slug, 'index.html');
  if (!fs.existsSync(file)) {
    console.log('skip missing', slug);
    continue;
  }
  let html = fs.readFileSync(file, 'utf8');

  // Remove old calc-seo-section if re-running
  html = html.replace(/\s*<section class="section-sm calc-seo-section">[\s\S]*?<\/section>\s*(?=<section class="section-sm" style="padding-top:0;">)/, '\n');

  const { article, extraFaqs } = buildSeoSection(slug, d);

  if (!html.includes('calc-seo-section')) {
    html = injectSeoArticle(html, article);
  }

  if (extraFaqs && d.extraFaqs[0] && !html.includes(d.extraFaqs[0].q)) {
    html = html.replace(
      /(<div class="faq-list">[\s\S]*?)(\s*<\/div>\s*\n\s*<\/div>\s*\n\s*<\/section>\s*\n\s*<footer class="footer">)/,
      '$1\n' + extraFaqs + '$2'
    );
  }

  html = injectTrustNote(html);

  // Expand FAQ schema if present - skip for now

  fs.writeFileSync(file, html);
  console.log('seo injected:', slug);
}

console.log('done');
