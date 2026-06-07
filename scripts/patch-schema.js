/**
 * Inject JSON-LD WebApplication + FAQPage on calculator pages.
 * Run: node scripts/patch-schema.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function extractFAQs(html) {
  const faqs = [];
  const re = /<button class="faq-q"[^>]*>([^<]+)<span/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    faqs.push(m[1].trim());
  }
  return faqs.slice(0, 5);
}

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      if (name === 'node_modules' || name === '.git') continue;
      walk(p);
    } else if (name === 'index.html' && p.includes('calculators')) {
      let html = fs.readFileSync(p, 'utf8');
      if (html.includes('"@type": "WebApplication"')) continue;

      const titleMatch = html.match(/<title>([^<]+)<\/title>/);
      const descMatch = html.match(/<meta name="description" content="([^"]+)"/);
      const canonMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
      const title = titleMatch ? titleMatch[1].replace(' — CalStacker.com', '') : 'Calculator';
      const desc = descMatch ? descMatch[1] : '';
      const url = canonMatch ? canonMatch[1] : '';

      const schema = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebApplication',
            name: title,
            description: desc,
            url: url,
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://calstacker.com/' },
              { '@type': 'ListItem', position: 2, name: title, item: url }
            ]
          }
        ]
      };

      const block = `\n  <script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n  </script>`;
      html = html.replace('</head>', block + '\n</head>');
      fs.writeFileSync(p, html);
      console.log('schema', path.relative(root, p));
    }
  }
}

walk(path.join(root, 'calculators'));
console.log('done');
