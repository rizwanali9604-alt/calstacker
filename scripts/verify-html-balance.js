const fs = require('fs');
const path = require('path');

function walk(d, acc) {
  acc = acc || [];
  for (const f of fs.readdirSync(d)) {
    const fp = path.join(d, f);
    const s = fs.statSync(fp);
    if (s.isDirectory()) {
      if (['node_modules', '.git', 'scripts', 'data', 'dashboard', 'blog'].includes(f)) continue;
      const rel = path.relative(path.join(__dirname, '..'), fp).replace(/\\/g, '/');
      if (/^guides\/(emi|sip|salary|tax|hra)\//.test(rel)) continue;
      walk(fp, acc);
    } else if (f.endsWith('.html')) acc.push(fp);
  }
  return acc;
}

function strip(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ');
}

function count(html, tag) {
  const o = (html.match(new RegExp('<' + tag + '\\b', 'gi')) || []).length;
  const c = (html.match(new RegExp('</' + tag + '>', 'gi')) || []).length;
  return [o, c];
}

let bad = 0;
for (const f of walk('.')) {
  const raw = fs.readFileSync(f, 'utf8');
  const h = strip(raw);
  const problems = [];
  ['div', 'main', 'section', 'header', 'nav', 'footer'].forEach(function (tag) {
    const [o, c] = count(h, tag);
    if (o !== c) problems.push(tag + ' ' + o + '/' + c);
  });
  const ids = (raw.match(/id="main-content"/g) || []).length;
  const mains = raw.match(/<main\b[^>]*>/gi) || [];
  if (ids !== 1) problems.push('main-content ids=' + ids);
  if (mains.length !== 1) problems.push('main tags=' + mains.length + ' ' + mains.join(' | '));
  if (problems.length) {
    bad += 1;
    console.log(path.relative('.', f) + ': ' + problems.join('; '));
  }
}
console.log(bad ? 'FAIL ' + bad : 'OK all published html balanced');
