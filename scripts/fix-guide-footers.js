const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (name === 'index.html') out.push(full);
  }
}
const files = [];
walk(path.join(ROOT, 'guides'), files);
let n = 0;
for (const file of files) {
  const rel = path.relative(ROOT, file);
  if (/guides[\\/](emi|sip|salary|tax|hra)[\\/]/.test(rel) && !rel.includes('-guide')) continue;
  let h = fs.readFileSync(file, 'utf8');
  if (h.includes('href="/editorial-policy/"')) continue;
  const next = h.replace(
    /<a href="\/about\/">About<\/a>\s*<a href="\/privacy\/">Privacy<\/a>\s*<a href="\/terms\/">Terms<\/a>\s*<a href="\/disclaimer\/">Disclaimer<\/a>/,
    '<a href="/about/">About</a>\n        <a href="/editorial-policy/">Editorial policy</a>\n        <a href="/contact/">Contact</a>\n        <a href="/privacy/">Privacy</a>\n        <a href="/terms/">Terms</a>\n        <a href="/disclaimer/">Disclaimer</a>'
  );
  if (next !== h) {
    fs.writeFileSync(file, next);
    n++;
    console.log('fixed', rel);
  }
}
console.log('count', n);
