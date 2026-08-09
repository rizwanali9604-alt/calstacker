/**
 * Remove leftover affiliate CTA fragments from calculator pages.
 */
const fs = require('fs');
const path = require('path');

const calcsDir = path.join(__dirname, '..', 'calculators');
let cleaned = 0;

for (const slug of fs.readdirSync(calcsDir)) {
  const file = path.join(calcsDir, slug, 'index.html');
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');
  const before = html;

  html = html.replace(/\s*<!-- AFFILIATE:[\s\S]*?-->/g, '');
  html = html.replace(/\s*<div class="affiliate-cta"[^>]*>[\s\S]*?<\/div>/g, '');
  // leftover guts when opening div was already removed
  html = html.replace(/\s*<div class="aff-icon">[\s\S]*?<\/div>\s*/g, '');
  html = html.replace(
    /\s*<div class="aff-text">[\s\S]*?<\/div>\s*<a href="#affiliate-link-needed"[\s\S]*?<\/a>\s*<\/div>/g,
    ''
  );
  html = html.replace(/\s*<a href="#affiliate-link-needed"[\s\S]*?<\/a>/g, '');
  html = html.replace(/\n{3,}/g, '\n\n');

  if (html !== before) {
    fs.writeFileSync(file, html);
    cleaned++;
    console.log('cleaned:', slug);
  } else if (html.includes('affiliate-link-needed') || html.includes('aff-text')) {
    console.log('STILL HAS AFFILIATE:', slug);
  }
}

console.log('done — cleaned', cleaned);
