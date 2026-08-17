const fs = require('fs');
const path = require('path');

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (['dashboard', 'data', 'blog', 'scripts', 'node_modules', '.git'].includes(name)) continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (name.endsWith('.html')) out.push(full);
  }
}

const files = [];
walk(path.join(__dirname, '..'), files);
let n = 0;
for (const file of files) {
  let h = fs.readFileSync(file, 'utf8');
  const before = h;
  h = h.replace(/(<link rel="canonical" href="[^"]+")(\r?\n)/g, '$1>$2');
  h = h.replace(/og-share\.png">>/g, 'og-share.png">');
  if (h !== before) {
    fs.writeFileSync(file, h);
    n++;
    console.log('fixed', path.relative(path.join(__dirname, '..'), file));
  }
}
console.log('fixed', n);
