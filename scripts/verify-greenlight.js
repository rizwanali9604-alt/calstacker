const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

function walk(dir, out) {
  out = out || [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach(function (ent) {
    if (/^(dashboard|blog|scripts|node_modules|\.git|\.wrangler)$/.test(ent.name)) return;
    const abs = path.join(dir, ent.name);
    const rel = path.relative(ROOT, abs).replace(/\\/g, '/');
    if (ent.isDirectory()) {
      if (/^guides\/(emi|sip|salary|tax|hra)\//.test(rel + '/')) return;
      walk(abs, out);
    } else if (ent.name.endsWith('.html')) out.push(abs);
  });
  return out;
}

let bad = 0;
let n = 0;
walk(ROOT).forEach(function (f) {
  const html = fs.readFileSync(f, 'utf8');
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) {
    n += 1;
    try {
      JSON.parse(m[1]);
    } catch (e) {
      bad += 1;
      console.log('BAD', path.relative(ROOT, f), e.message);
    }
  }
});
console.log('json-ld blocks', n, 'bad', bad);

const idx = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const hrefs = [...idx.matchAll(/id="calc-catalog"[\s\S]*?<section class="section" id="guides">/)[0][0].matchAll(/href="(\/calculators\/[^"]+)/g)].map(function (x) { return x[1]; });
console.log('catalog hrefs', hrefs.length, 'unique', new Set(hrefs).size);
console.log('published gtag', idx.includes('googletagmanager.com/gtag'));
console.log('consent stub', idx.includes('consent-defaults.js'));
console.log('guides on home', (idx.match(/<article class="guide-card">/g) || []).length);
