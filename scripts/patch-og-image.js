const fs = require('fs');
const path = require('path');

function walk(d, acc) {
  acc = acc || [];
  for (const name of fs.readdirSync(d)) {
    if (['node_modules', '.git', '.wrangler'].includes(name)) continue;
    const fp = path.join(d, name);
    if (fs.statSync(fp).isDirectory()) walk(fp, acc);
    else if (name.endsWith('.html')) acc.push(fp);
  }
  return acc;
}

const DIM =
  '  <meta property="og:image:width" content="1200">\n' +
  '  <meta property="og:image:height" content="630">\n' +
  '  <meta property="og:image:type" content="image/jpeg">';

let n = 0;
walk(path.join(__dirname, '..')).forEach(function (fp) {
  let html = fs.readFileSync(fp, 'utf8');
  const before = html;
  html = html.replace(/\/assets\/img\/og-share\.png/g, '/assets/img/og-share.jpg');
  if (html.includes('og-share.jpg') && !html.includes('og:image:width')) {
    html = html.replace(
      /<meta property="og:image:alt" content="[^"]*">/,
      function (m) {
        return m + '\n' + DIM;
      }
    );
  }
  if (html !== before) {
    fs.writeFileSync(fp, html);
    n += 1;
  }
});
console.log('og patched', n);
