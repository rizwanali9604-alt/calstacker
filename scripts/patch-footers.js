const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const oldBlock = `<h4>Company</h4>
          <ul>
            <li><a href="/about/">About</a></li>
            <li><a href="/privacy/">Privacy Policy</a></li>
            <li><a href="/sitemap.xml">Sitemap</a></li>
          </ul>`;
const newBlock = `<h4>Company</h4>
          <ul>
            <li><a href="/about/">About</a></li>
            <li><a href="/disclaimer/">Disclaimer</a></li>
            <li><a href="/privacy/">Privacy Policy</a></li>
            <li><a href="/contact/">Contact</a></li>
            <li><a href="/sitemap.xml">Sitemap</a></li>
          </ul>`;

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      if (name === 'node_modules' || name === '.git') continue;
      walk(p);
    } else if (name.endsWith('.html')) {
      let html = fs.readFileSync(p, 'utf8');
      if (html.includes(oldBlock)) {
        html = html.replace(oldBlock, newBlock);
        fs.writeFileSync(p, html);
        console.log('patched', p);
      }
    }
  }
}

walk(root);
console.log('done');
