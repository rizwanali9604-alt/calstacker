/**
 * Regenerate sitemap.xml from static routes + guides + blog.
 * Run: node scripts/patch-sitemap.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const base = 'https://calstacker.com';

const urls = [
  { loc: '/', priority: '1.0' },
  { loc: '/dashboard/', priority: '0.2' },
  { loc: '/blog/', priority: '0.7' },
  { loc: '/guides/', priority: '0.8' }
];

const calcs = fs.readdirSync(path.join(root, 'calculators')).filter(f =>
  fs.statSync(path.join(root, 'calculators', f)).isDirectory()
);
calcs.forEach(c => {
  const pri = ['emi', 'sip', 'income-tax', 'salary', 'hra'].includes(c) ? '0.9' : '0.8';
  urls.push({ loc: `/calculators/${c}/`, priority: pri });
});

['about', 'privacy', 'disclaimer', 'contact'].forEach(p => {
  urls.push({ loc: `/${p}/`, priority: '0.3' });
});

function walkGuides(dir, prefix) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      walkGuides(p, prefix + name + '/');
    } else if (name === 'index.html') {
      const rel = prefix.replace(/\\/g, '/');
      if (rel !== 'index/') urls.push({ loc: `/guides/${rel}`, priority: '0.75' });
    }
  }
}
walkGuides(path.join(root, 'guides'), '');

function walkBlog(dir, prefix) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      walkBlog(p, prefix + name + '/');
    } else if (name === 'index.html' && prefix !== '') {
      urls.push({ loc: `/blog/${prefix.replace(/\\/g, '/')}`, priority: '0.65' });
    }
  }
}
walkBlog(path.join(root, 'blog'), '');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${base}${u.loc}</loc><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(root, 'sitemap.xml'), xml);
console.log('sitemap —', urls.length, 'urls');
