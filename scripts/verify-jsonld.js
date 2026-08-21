const fs = require('fs');
const files = [
  'guides/gst-guide/index.html',
  'guides/tax-saving-guide/index.html',
  'calculators/cagr/index.html',
  'about/index.html',
  'index.html'
];
for (const f of files) {
  const h = fs.readFileSync(f, 'utf8');
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let m;
  let n = 0;
  while ((m = re.exec(h))) {
    n += 1;
    try {
      JSON.parse(m[1]);
    } catch (e) {
      console.log('FAIL', f, e.message);
    }
  }
  console.log(f, 'json-ld', n);
}
console.log('jpg', fs.statSync('assets/img/og-share.jpg').size);
console.log('webp', fs.statSync('assets/img/og-share.webp').size);
