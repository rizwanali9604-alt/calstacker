const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const re = /<h4>Company<\/h4>\s*<ul>\s*<li><a href="\/about\/">About<\/a><\/li>\s*<li><a href="\/privacy\/">Privacy Policy<\/a><\/li>\s*<li><a href="\/sitemap\.xml">Sitemap<\/a><\/li>\s*<\/ul>/g;
const neu = `<h4>Company</h4>
          <ul>
            <li><a href="/about/">About</a></li>
            <li><a href="/guides/">Guides</a></li>
            <li><a href="/contact/">Contact</a></li>
            <li><a href="/privacy/">Privacy Policy</a></li>
            <li><a href="/terms/">Terms of Service</a></li>
            <li><a href="/disclaimer/">Disclaimer</a></li>
            <li><a href="/sitemap.xml">Sitemap</a></li>
          </ul>`;
function walk(d) {
  for (const n of fs.readdirSync(d)) {
    const p = path.join(d, n);
    if (fs.statSync(p).isDirectory()) {
      if (!['node_modules', '.git'].includes(n)) walk(p);
    } else if (n.endsWith('.html')) {
      let h = fs.readFileSync(p, 'utf8');
      if (re.test(h)) {
        h = h.replace(re, neu);
        fs.writeFileSync(p, h);
        console.log('footer', path.relative(root, p));
      }
      re.lastIndex = 0;
    }
  }
}
walk(root);
