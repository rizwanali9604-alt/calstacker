const fs = require('fs');
const path = require('path');

function walk(d, acc) {
  acc = acc || [];
  for (const name of fs.readdirSync(d)) {
    if (['node_modules', '.git', 'scripts', 'data', 'dashboard', 'blog'].includes(name)) continue;
    const fp = path.join(d, name);
    if (fs.statSync(fp).isDirectory()) walk(fp, acc);
    else if (name === 'index.html' || name === '404.html') acc.push(fp);
  }
  return acc;
}

function words(html) {
  const h = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ');
  return h.split(/\s+/).filter(Boolean).length;
}

const rows = walk('.').map(function (f) {
  const html = fs.readFileSync(f, 'utf8');
  const rel = path.relative('.', f).replace(/\\/g, '/');
  const verified = html.match(/Last verified \d{1,2} August 2026|GST 2\.0 last verified \d{1,2} August 2026|Rules last verified \d{1,2} August 2026|Model last verified \d{1,2} August 2026|Rule 2A last reviewed \d{1,2} August 2026/g) || [];
  const updated = html.match(/Last updated[:]? \d{1,2} August 2026/g) || [];
  const og = (html.match(/og-share\.(png|jpg)/g) || []).join(',');
  const main = (html.match(/id="main-content"/g) || []).length;
  return { rel: rel, w: words(html), verified: verified.join(' | '), updated: updated.join(' | '), og: og, main: main };
});

rows.sort(function (a, b) { return a.w - b.w; });
rows.forEach(function (r) {
  if (r.rel.indexOf('guides/emi/') === 0 || r.rel.indexOf('guides/sip/') === 0 || r.rel.indexOf('guides/salary/') === 0 || r.rel.indexOf('guides/tax/') === 0 || r.rel.indexOf('guides/hra/') === 0) return;
  console.log(String(r.w).padStart(5), r.main, r.rel);
  if (r.verified) console.log('      V:', r.verified);
  if (r.updated) console.log('      U:', r.updated);
  if (r.og && r.og.indexOf('png') !== -1) console.log('      OG PNG leftover');
});
