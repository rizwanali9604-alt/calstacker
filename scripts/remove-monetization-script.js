const fs = require('fs');
const path = require('path');
function walk(d) {
  for (const n of fs.readdirSync(d)) {
    const p = path.join(d, n);
    if (fs.statSync(p).isDirectory()) {
      if (n !== 'node_modules' && n !== '.git') walk(p);
    } else if (n.endsWith('.html')) {
      let h = fs.readFileSync(p, 'utf8');
      const b = h;
      h = h.replace(/\n  <script src="\/assets\/js\/monetization-config\.js"><\/script>/g, '');
      if (h !== b) {
        fs.writeFileSync(p, h);
        console.log('removed monetization-config', p);
      }
    }
  }
}
walk(path.join(__dirname, '..', 'calculators'));
